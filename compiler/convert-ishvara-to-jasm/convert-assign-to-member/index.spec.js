import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['convert-assign-to-member', plugin],
    ],
});

test('compiler: convert-assign-to-member: report', (t) => {
    t.report('convert-assign-to-member', `Use 'Member Expression' instead of 'Assignment Expression'`);
    t.end();
});

test('compiler: convert-assign-to-member: transform', (t) => {
    t.transform('convert-assign-to-member');
    t.end();
});
