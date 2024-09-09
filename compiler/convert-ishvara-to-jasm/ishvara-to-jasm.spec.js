import {createTest} from './test/create-test.js';

const test = createTest(import.meta.url);

test('ishvara: convert-ishvara-to-jasm: convert-assign-to-add', (t) => {
    t.compile('convert-assign-to-add');
    t.end();
});

test('ishvara: convert-ishvara-to-jasm: convert-assign-to-mov', (t) => {
    t.compile('convert-assign-to-mov');
    t.end();
});
