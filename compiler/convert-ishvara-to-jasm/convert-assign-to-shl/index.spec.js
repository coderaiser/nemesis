import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['convert-assign-to-shl', plugin],
    ],
});

test('compiler: convert-assign-to-shl: report', (t) => {
    t.report('convert-assign-to-shl', `Use 'shl()' instead of 'assign'`);
    t.end();
});

test('compiler: convert-assign-to-shl: transform', (t) => {
    t.transform('convert-assign-to-shl');
    t.end();
});
