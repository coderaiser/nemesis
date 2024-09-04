import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['convert-equ-call-to-member', plugin],
    ],
});

test('compiler: convert-equ-call-to-member: report', (t) => {
    t.report('convert-equ-call-to-member', `Use '__a.equ.__b' instead of equ(__a, __b)`);
    t.end();
});

test('compiler: convert-equ-call-to-member: transform', (t) => {
    t.transform('convert-equ-call-to-member');
    t.end();
});
