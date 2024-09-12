import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['convert-function-to-label', plugin],
    ],
});

test('compiler: convert-function-to-label: report', (t) => {
    t.report('convert-function-to-label', `Use 'label' instead of 'function'`);
    t.end();
});

test('compiler: convert-function-to-label: transform', (t) => {
    t.transform('convert-function-to-label');
    t.end();
});

test('compiler: convert-function-to-label: transform: async', (t) => {
    t.transform('async');
    t.end();
});

test('compiler: convert-function-to-label: transform: no-stack', (t) => {
    t.transform('no-stack');
    t.end();
});
