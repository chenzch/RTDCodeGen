import { fileExist } from './service.ts';

/**
 * 代码模块的基类
 */
abstract class CodeModule {
    protected fileStatus: number = 0;

    /**
     * 生成包含语句
     * @returns include语句的字符串
     */
    abstract include(): string;

    /**
     * 生成模块开始部分的代码
     * @returns 开始代码的字符串
     */
    abstract start(): string;

    /**
     * 生成模块结束部分的代码
     * @returns 结束代码的字符串
     */
    abstract end(): string;

    /**
     * 检查文件是否存在
     * @param files 要检查的文件名数组
     * @returns 32位无符号整数，每一位表示对应索引的文件是否存在
     */
    findFiles(files: string[]): number {
        this.fileStatus = 0;

        files.forEach((file, index) => {
            if (index >= 32) return; // 只处理前32个文件
            if (fileExist(file)) {
                this.fileStatus |= (1 << index);
            }
        });

        return this.fileStatus;
    }

    /**
     * 检查fileStatus中指定位是否为1
     * @param bitIndex 要检查的位索引（0-31）
     * @returns 如果指定位为1则返回true，否则返回false
     */
    fileExist(bitIndex: number): boolean {
        if (bitIndex >= 32) return false;
        return (this.fileStatus & (1 << bitIndex)) !== 0;
    }
}

export { CodeModule };
