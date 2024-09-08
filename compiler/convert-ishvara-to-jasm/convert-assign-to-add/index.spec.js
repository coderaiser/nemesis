import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['convert-assign-to-add', plugin],
    ],
});

test('compiler: convert-assign-to-add: report', (t) => {
    t.report('convert-assign-to-add', `Use 'add(__a, __b)' instead of '__a += __b'`);
    t.end();
});

test('compiler: convert-assign-to-add: transform', (t) => {
    t.transform('convert-assign-to-add');
    t.end();
});
