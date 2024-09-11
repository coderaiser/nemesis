import {readFileSync} from 'node:fs';
import process from 'node:process';
import esbuild from 'esbuild';
import {jasmToAsm} from './convert-jasm-to-asm/jasm-to-asm.js';
import {convertIshvaraToJasm} from './convert-ishvara-to-jasm/convert-ishvara-to-jasm.js';

const [infile] = process.argv.slice(2);
const outfile = infile.replace(/\.ts$/, '.ishtar.js');

esbuild.buildSync({
    entryPoints: [infile],
    bundle: true,
    write: true,
    minify: false,
    outfile,
    mainFields: ['browser', 'main'],
    platform: 'node',
});

const source = readFileSync(outfile, 'utf8');
const jasm = convertIshvaraToJasm(source);
const code = jasmToAsm(jasm);

process.stdout.write(code);
