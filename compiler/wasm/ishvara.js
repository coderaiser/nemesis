import {readFileSync} from 'node:fs';
import process from 'node:process';
import {jasmToWast} from './convert-jasm-to-wast/jasm-to-wast.js';
import {convertIshvaraToJasm} from './convert-ishvara-to-jasm/convert-ishvara-to-jasm.js';

const [input] = process.argv.slice(2);

if (!input) {
    console.error('ishvara [input]');
    process.exit(1);
}

const source = readFileSync(input, 'utf8');
const jasm = convertIshvaraToJasm(source);
const code = jasmToWast(jasm);

process.stdout.write(code);

