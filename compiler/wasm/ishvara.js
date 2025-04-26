import {readFileSync} from 'node:fs';
import process from 'node:process';
import putout from 'putout';
import {printWast} from './printer-wast/printer-wast.js';
import * as pluginWastTS from './putout-plugin-wast-ts/index.js';

const [input] = process.argv.slice(2);

if (!input) {
    console.error('ishvara [input]');
    process.exit(1);
}

const source = readFileSync(input, 'utf8');
const {code: plainWastTs} = putout(source, {
    fix: true,
    isTS: true,
    plugins: [
        ['wast-ts', pluginWastTS],
    ],
});

const code = printWast(plainWastTs);

process.stdout.write(code);
