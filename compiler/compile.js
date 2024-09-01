import {print} from '@putout/printer';
import {readFileSync} from 'fs';
import {parse} from 'putout';
import {CallExpression} from './call-expression.js';

const [arg] = process.argv.slice(2);

if (!arg) {
    console.log('compile [source]');
    process.exit();
}

const source = readFileSync(arg, 'utf8');

const ast = parse(source);

const code = print(ast, {
    visitors: {
        CallExpression,
    }
});

console.log(code);
