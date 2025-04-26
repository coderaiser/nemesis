import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-putout-wast-import', plugin],
    ],
});

test('wasm: apply-putout-wast-import: report', (t) => {
    t.report('apply-putout-wast-import', `Use '__ishvara_wast_import()'`);
    t.end();
});

test('wasm: apply-putout-wast-import: transform', (t) => {
    t.transform('apply-putout-wast-import');
    t.end();
});
