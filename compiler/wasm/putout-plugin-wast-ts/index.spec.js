import {createTest} from './test/create-test.js';

const test = createTest(import.meta.url);

test('ishvara: putout-wast-ts: convert-assign-to-add', (t) => {
    t.compile('convert-assign-to-add');
    t.end();
});

test('ishvara: putout-wast-ts: convert-assign-to-mov', (t) => {
    t.compile('convert-assign-to-mov');
    t.end();
});

test('ishvara: putout-wast-ts: convert-assign-to-xor', (t) => {
    t.compile('convert-assign-to-xor');
    t.end();
});

test('ishvara: putout-wast-ts: convert-assign-to-shl', (t) => {
    t.compile('convert-assign-to-shl');
    t.end();
});

test('ishvara: putout-wast-ts: convert-function-to-label', (t) => {
    t.compile('convert-function-to-label');
    t.end();
});

test('ishvara: putout-wast-ts: split-stack-operations', (t) => {
    t.compile('split-stack-operations');
    t.end();
});

test('ishvara: putout-wast-ts: convert-await-to-call', (t) => {
    t.compile('convert-await-to-call');
    t.end();
});
