import { CodeModule } from './codeModule.ts';

/**
 * 端口配置模块
 */
class PortModule extends CodeModule {
    constructor() {
        super();
        const requiredFiles = ['Mcal.h', 'Std_Types.h'];
        this.findFiles(requiredFiles);
    }

    include(): string {
        return '';
    }

    start(): string {
        return '';
    }

    end(): string {
        return '';
    }
}

export { PortModule };
