import { findVar } from './service.ts';
import { CodeModule } from './codeModule.ts';

/**
 * MCU配置模块
 */
class McuModule extends CodeModule {
    constructor() {
        super();
        const requiredFiles = ['RTD\\include\\Mcu.h', 'RTD\\include\\Clock_Ip.h', 'RTD\\include\\Power_Ip.h', 'RTD\\include\\Ram_Ip.h'];
        this.findFiles(requiredFiles);
    }

    include(): string {
        if (this.fileExist(0)) {
            return '#include "Mcu.h"\n';
        } else {
            let text = '';
            if (this.fileExist(1)) {
                text += '#include "Clock_Ip.h"\n';
            }
            if (this.fileExist(2)) {
                text += '#include "Power_Ip.h"\n';
            }
            if (this.fileExist(3)) {
                text += '#include "Ram_Ip.h"\n';
            }
            return text;
        }
    }

    start(): string {
        let text = '';
        if (this.fileExist(0)) {
            let McuConfig = findVar('generate\\include\\Mcu_*PBcfg.h', 'extern const Mcu_ConfigType ([^ ]*);');
            if (McuConfig === null) {
                McuConfig = 'NULL_PTR';
            } else {
                McuConfig = '&' + McuConfig;
            }
            let ClockConfig = findVar('generate\\include\\Mcu_Cfg.h', '#define ([^ ]*)[ ]+\\(\\(Mcu_ClockType\\)0U\\)');
            if (ClockConfig === null) {
                ClockConfig = '0';
            }
            let ModeConfig = findVar('generate\\include\\Mcu_Cfg.h', '#define ([^ ]*)[ ]+\\(\\(Mcu_ModeType\\)0U\\)');
            if (ModeConfig === null) {
                ModeConfig = '0';
            }
            text = `    /* Initialize the Mcu driver */
#if (MCU_PRECOMPILE_SUPPORT == STD_ON)
    Mcu_Init(NULL_PTR);
#elif (MCU_PRECOMPILE_SUPPORT == STD_OFF)
    Mcu_Init(${McuConfig});
#endif /* (MCU_PRECOMPILE_SUPPORT == STD_ON) */

    /* Initialize the clock tree and apply PLL as system clock */
#if (MCU_INIT_CLOCK == STD_ON)
    Mcu_InitClock(${ClockConfig});
#endif /* (MCU_INIT_CLOCK == STD_ON) */

    /* Apply a mode configuration */
    Mcu_SetMode(${ModeConfig});
`;
        } else {
            if (this.fileExist(1)) {
                const ClockConfig = findVar('generate\\include\\Clock_Ip_*PBcfg.h', 'extern const Clock_Ip_ClockConfigType (.*)\\[\\];');
                if (ClockConfig === null) {
                    text += '#error Clock_Ip_ClockConfigType not found in generate\\include\\Clock_Ip_*PBcfg.h\n';
                } else {
                    text += `    Clock_Ip_Init(&${ClockConfig}[0]);\n`;
                }
            }
            if (this.fileExist(2)) {
                const PowerConfig = findVar('generate\\include\\Power_Ip_*PBcfg.h', 'extern const Power_Ip_HwIPsConfigType (.*);');
                if (PowerConfig === null) {
                    text += '#error Power_Ip_HwIPsConfigType not found in generate\\include\\Power_Ip_*PBcfg.h\n';
                } else {
                    text += `    Power_Ip_Init(&${PowerConfig});\n`;
                }
                const PowerModeConfig = findVar('generate\\include\\Power_Ip_*PBcfg.h', 'extern const Power_Ip_ModeConfigType (.*)\\[\\];');
                if (PowerModeConfig === null) {
                    text += '#error Power_Ip_ModeConfigType not found in generate\\include\\Power_Ip_*PBcfg.h\n';
                } else {
                    text += `    Power_Ip_SetMode(&${PowerModeConfig}[0]);\n`;
                }
            }
            if (this.fileExist(3)) {
                let RamConfig = findVar('generate\\include\\Ram_Ip_*PBcfg.h', 'extern const Ram_Ip_RamConfigType (.*)\\[\\];');
                if (RamConfig === null) {
                    RamConfig = '#error Ram_Ip_RamConfigType not found in generate\\include\\Ram_Ip_*PBcfg.h\n';
                }
                text += `    Ram_Ip_InitRamSection(&${RamConfig}[0]);\n`;
            }
        }
        return text;
    }

    end(): string {
        return '';
    }
}

export { McuModule };
