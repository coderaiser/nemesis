import {readFileSync} from 'node:fs';
import process from 'node:process';
import esbuild from 'esbuild';
import {jasmToAsm} from './jasm-to-asm/jasm-to-asm.js';

const [infile] = process.argv.slice(2);
const outfile = infile.replace(/\.js$/, '.ishtar.js');

esbuild.buildSync({
    entryPoints: [infile],
    bundle: true,
    write: true,
    outfile,
    platform: 'node',
});

const source = readFileSync(outfile, 'utf8');
const code = jasmToAsm(source);

process.stdout.write(code);

