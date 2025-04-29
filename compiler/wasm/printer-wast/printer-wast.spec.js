import {test} from 'supertape';
import montag from 'montag';
import {printWast} from './printer-wast.js';

test('ishvara: convert-jasm-to-wast', (t) => {
    const source = montag`
        export function x(a: i32, b: i32): i32 {
            i32.add(local.get(a), local.get(b));
            call('log');
        }
    `;
    
    const result = printWast(source);
    const expected = montag`
        (module
            (func $x (export "x") (param $a i32) (param $b i32) (result i32)
                (i32.add (local.get $a) (local.get $b))
                (call $log)
            )
        )\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('ishvara: convert-jasm-to-wast: import', (t) => {
    const source = montag`
        __ishvara_wast_import('console', 'log', log, i32);
        export function x(a: i32, b: i32): i32 {
            i32.add(local.get(a), local.get(b));
            call('log');
        }
    `;
    
    const result = printWast(source);
    const expected = montag`
        (module
            (import "console" "log" (func $log(param i32)))
            (func $x (export "x") (param $a i32) (param $b i32) (result i32)
                (i32.add (local.get $a) (local.get $b))
                (call $log)
            )
        )\n
    `;
    
    t.equal(result, expected);
    t.end();
});
