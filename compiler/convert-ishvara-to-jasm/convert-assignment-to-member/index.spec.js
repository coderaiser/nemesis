import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['convert-assignment-to-member', plugin],
    ],
});

test('compiler: convert-assignment-to-member: report', (t) => {
    t.report('convert-assignment-to-member', `Use 'Member Expression' instead of 'Assignment Expression'`);
    t.end();
});

test('compiler: convert-assignment-to-member: transform', (t) => {
    t.transform('convert-assignment-to-member');
    t.end();
});
