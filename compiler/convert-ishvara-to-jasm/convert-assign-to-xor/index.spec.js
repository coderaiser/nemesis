import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['convert-assign-to-xor', plugin],
    ],
});

test('compiler: convert-assign-to-xor: report', (t) => {
    t.report('convert-assign-to-xor', `Use 'xor()' instead of 'assign'`);
    t.end();
});

test('compiler: convert-assign-to-xor: transform', (t) => {
    t.transform('convert-assign-to-xor');
    t.end();
});
