import {readFileSync} from 'node:fs';
import process from 'node:process';
import esbuild from 'esbuild';
import {jasmToAsm} from './jasm-to-asm/jasm-to-asm.js';
import {ishvaraToJasm} from './ishvara-to-jasm/ishvara-to-jasm.js';

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
const jasm = ishvaraToJasm(source);
const code = jasmToAsm(jasm);

process.stdout.write(code);
