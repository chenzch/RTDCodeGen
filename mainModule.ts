import { CodeModule } from './codeModule.ts';

/**
 * 主程序模块
 */
class MainModule extends CodeModule {
    constructor() {
        super();
        const requiredFiles = ['RTD/include/OsIf.h'];
        this.findFiles(requiredFiles);
    }

    include(): string {
        let text = '#include "Mcal.h"\n';
        if (this.fileExist(0)) {
            text += '#include "OsIf.h"\n';
        }
        return text;
    }

    start(): string {
        let text = 'int main(void) {\n';
        if (this.fileExist(0)) {
            text += '    SuspendAllInterrupts();\n';
        }
        return text;
    }

    end(): string {
        let text = '    for(;;);\n    return 0;\n}\n';
        if (this.fileExist(0)) {
            text = '    ResumeAllInterrupts();\n\n' + text;
        }
        return text;
    }
}

export { MainModule };
