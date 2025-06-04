import process from 'node:process';
import {open, readFile} from 'node:fs/promises';
import tryToCatch from 'try-to-catch';

const BOOT_FILE = 'boot.bin';
const IMAGE_FILE = 'nemesis.img';
const SUCCESS_MSG = 'Boot Record writed successfully.';
const OFFSET = 0;
const POSITION = 0;

const [error, data] = await tryToCatch(readFile, BOOT_FILE);

if (error) {
    console.error(error);
    process.exit(1);
}

const [errorOpen, fileHandle] = await tryToCatch(open, IMAGE_FILE, 'r+');

if (errorOpen) {
    console.error(errorOpen);
    process.exit(1);
}

const [errorWrite] = await tryToCatch(fileHandle.write.bind(fileHandle), data, OFFSET, data.length, POSITION);
if (errorWrite) {
    console.error(errorWrite);
    process.exit(1);
}

console.log(SUCCESS_MSG);
