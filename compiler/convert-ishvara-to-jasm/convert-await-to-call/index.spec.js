import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['convert-await-to-call', plugin],
    ],
});

test('compiler: convert-await-to-call: report', (t) => {
    t.report('convert-await-to-call', `Use 'call()' operations instead of 'await'`);
    t.end();
});

test('compiler: convert-await-to-call: transform', (t) => {
    t.transform('convert-await-to-call');
    t.end();
});
