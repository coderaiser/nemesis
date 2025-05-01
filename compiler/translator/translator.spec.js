import {test} from 'supertape';
import fromBase64 from 'es-arraybuffer-base64/Uint8Array.fromBase64';
import {translate} from './translator.js';

test('fasm: translator', (t) => {
    const asm = `bpbOEM db 'nemesis ';`;
    const result = translate(asm);
    const expected = fromBase64(btoa(asm));
    
    t.equal(result, expected);
    t.end();
});

