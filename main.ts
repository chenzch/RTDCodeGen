import { fileExist } from "./service.ts";
import { MainModule } from './mainModule.ts';
import { McuModule } from './mcuModule.ts';
import { PortModule } from './portModule.ts';

if (await fileExist("generate/include") &&
    await fileExist("generate/src") &&
    await fileExist("board"))
{

  console.log(`/*==================================================================================================
*   Copyright 2020 - 2023 NXP Semiconductors
*
*   NXP Confidential. This software is owned or controlled by NXP and may only be
*   used strictly in accordance with the applicable license terms. By expressly
*   accepting such terms or by downloading, installing, activating and/or otherwise
*   using the software, you are agreeing that you have read, and that you agree to
*   comply with and are bound by, such license terms. If you do not agree to be
*   bound by the applicable license terms, then you may not retain, install,
*   activate or otherwise use the software.
==================================================================================================*/
`);
} else {
  Deno.exit(1);
}

const mainModule = new MainModule();
const mcuModule = new McuModule();
const portModule = new PortModule();

console.log(mainModule.include());
console.log(mcuModule.include());
console.log(portModule.include());

console.log(mainModule.start());

console.log(mcuModule.start());
console.log(portModule.start());

console.log(mcuModule.end());
console.log(portModule.end());

console.log(mainModule.end());
