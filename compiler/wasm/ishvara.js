import {readFileSync, writeFileSync} from 'node:fs';
import process from 'node:process';
import putout from 'putout';
import createWabt from 'wabt';
import * as pluginWastTS from '#putout-plugin-wast-ts';
import {printWast} from './printer-wast/printer-wast.js';

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

const wast = printWast(plainWastTs);
const {buffer: wasm} = await wast2wasm(input, wast);

writeFileSync(input.replace('.wast.ts', '.wasm'), wasm);
writeFileSync(input.replace('.wast.ts', '.wast'), wast);

console.time('x');
const mod = new WebAssembly.Module(wasm);
const instance = new WebAssembly.Instance(mod);

console.timeEnd('x');

console.log(instance.exports.x(1, 2));

async function wast2wasm(name, wat) {
    const wabt = await createWabt();
    const parsedWat = wabt.parseWat('ishvara.wast.ts', wat);
    
    const wasm = parsedWat.toBinary({
        log: false,
    });
    
    return wasm;
}
