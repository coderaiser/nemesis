import {print} from './printer/printer.js';
import {readFileSync} from 'fs';
import {parse} from 'putout';
import {CallExpression} from './printer/visitors/call-expression.js';
import {MemberExpression} from './printer/visitors/member-expression.js';

const [arg] = process.argv.slice(2);

if (!arg) {
    console.log('compile [source]');
    process.exit();
}

const source = readFileSync(arg, 'utf8');

const ast = parse(source);

const code = print(ast);

process.stdout.write(code);
