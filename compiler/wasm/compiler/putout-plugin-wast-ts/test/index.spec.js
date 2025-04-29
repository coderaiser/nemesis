import {createTest} from '@putout/test';
import * as wastTS from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['wast-ts', wastTS],
    ],
});

test('ishvara: putout-wast-ts: apply-putout-wast-import', (t) => {
    t.transform('apply-putout-wast-import');
    t.end();
});
