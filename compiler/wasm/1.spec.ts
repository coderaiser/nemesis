import {test, stub} from 'supertape';
import * as one from './1.ts';
import {prepare} from './prepare.js';

const preparedOne = prepare(one);

test('ishvara: wast: one', (t) => {
    const result = preparedOne.x(4, 6);
    
    t.deepEqual(result, 10);
    t.end();
});

test('ishvara: wast: one: imports', (t) => {
    const fn = stub();
    preparedOne.declareImport('console', 'log', fn);
    
    preparedOne.x(4, 6);
    
    preparedOne.undeclareImport('console', 'log', fn);
    
    t.calledWithNoArgs(fn);
    t.end();
});
