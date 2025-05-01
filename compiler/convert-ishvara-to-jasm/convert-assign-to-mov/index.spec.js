import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-assign-to-mov', plugin],
    ],
});

test('compiler: convert-assign-to-mov: report', (t) => {
    t.report('convert-assign-to-mov', `Use 'mov()' instead of '='`);
    t.end();
});

test('compiler: convert-assign-to-mov: no report: member', (t) => {
    t.noReport('member');
    t.end();
});

test('compiler: convert-assign-to-mov: transform', (t) => {
    t.transform('convert-assign-to-mov');
    t.end();
});

