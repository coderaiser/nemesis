import {createTest} from '@putout/test';

const test = createTest(import.meta.url);

test('ishvara: putout-wast-ts: apply-putout-wast-import', (t) => {
    t.transform('apply-putout-wast-import');
    t.end();
});
