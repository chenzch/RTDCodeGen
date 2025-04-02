import { expandGlobSync } from "https://deno.land/std@0.201.0/fs/expand_glob.ts";

const BaseDir = "C:\\Users\\peter_chen.WTMEC\\SyncData\\Projects\\MCU\\S32K344EVB\\S32K344EVB\\TestCAM1153_344\\";

export function fileExist(filePath: string): boolean {
    try {
        filePath = BaseDir + filePath;
        for (const _ of expandGlobSync(filePath)) {
            return true;
        }
        return false;
    } catch (error) {
        console.error(`检查文件时出错: ${error}`);
        return false;
    }
}

export function findVar(filePattern: string, regexPattern: string): string | null {
    try {
        // 构建完整的文件路径
        const fullPath = BaseDir + filePattern;

        // 查找第一个匹配的文件
        let targetFile: string | null = null;
        for (const file of expandGlobSync(fullPath)) {
            targetFile = file.path;
            break;
        }

        if (!targetFile) {
            return null;
        }

        // 读取文件内容
        const content = Deno.readTextFileSync(targetFile);

        // 创建正则表达式对象并查找匹配
        const regex = new RegExp(regexPattern);
        const match = content.match(regex);

        // 如果找到匹配并且有捕获组，返回第一个捕获组
        if (match && match.length > 1) {
            return match[1];
        }

        return null;
    } catch (error) {
        console.error(`查找变量时出错: ${error}`);
        return null;
    }
}
