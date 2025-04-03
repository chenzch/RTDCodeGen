import { CodeModule } from './codeModule.ts';

/**
 * 主程序模块
 */
class MainModule extends CodeModule {
    constructor() {
        super();
    }

    include(): string {
        return '#include "Mcal.h"\n#include "OsIf.h"';
    }

    start(): string {
        return 'int main(void) {\n\n    SuspendAllInterrupts();\n';
    }

    end(): string {
        return '    ResumeAllInterrupts();\n\n    for(;;);\n    return 0;\n}\n';
    }
}

export { MainModule };
