import {readFileSync, writeFileSync} from 'node:fs';
import process from 'node:process';
import {compile} from '#compiler';
import {run} from '#runner';
import {translate} from '#translator';

const [input] = process.argv.slice(2);

if (!input) {
    console.error('ishvara [input]');
    process.exit(1);
}

const source = readFileSync(input, 'utf8');

const wast = compile(source);
const wasm = await translate(input, wast);

writeFileSync(input.replace('.wast.ts', '.wasm'), wasm);
writeFileSync(input.replace('.wast.ts', '.wast'), wast);

const y = run(wasm, {
    console: {
        log: (a) => {
            console.log('wasm:', a);
            return a;
        },
    },
});

console.log('js:', y.x(1, 2));
