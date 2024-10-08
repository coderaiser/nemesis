import putout from 'putout';
import * as convertVarToDb from './convert-var-to-db/index.js';
import * as moveVarsToBottom from './move-vars-to-bottom/index.js';
import * as convEquCallToMember from './convert-equ-call-to-member/index.js';
import * as convertDecToHex from './convert-dec-to-hex/index.js';
import * as convertAssignToMember from './convert-assign-to-member/index.js';
import * as convertAssignToAdd from './convert-assign-to-add/index.js';
import * as convertAssignToMov from './convert-assign-to-mov/index.js';
import * as convertAssignToXor from './convert-assign-to-xor/index.js';
import * as convertAssignToShl from './convert-assign-to-shl/index.js';
import * as convertAwaitToCall from './convert-await-to-call/index.js';
import * as splitStackOperations from './split-stack-operations/index.js';
import * as convertFunctionToLabel from './convert-function-to-label/index.js';

export const convertIshvaraToJasm = (source) => {
    const {code} = putout(source, {
        isTS: true,
        plugins: [
            ['ishvara/move-vars-to-bottom', moveVarsToBottom],
            ['ishvara/convert-vars-to-db', convertVarToDb],
            ['ishvara/convert-dec-to-hex', convertDecToHex],
            ['ishvara/convert-equ-call-to-member', convEquCallToMember],
            ['ishvara/convert-assign-to-member', convertAssignToMember],
            ['ishvara/convert-assign-to-add', convertAssignToAdd],
            ['ishvara/convert-assign-to-mov', convertAssignToMov],
            ['ishvara/convert-assign-to-xor', convertAssignToXor],
            ['ishvara/convert-assign-to-shl', convertAssignToShl],
            ['ishvara/convert-function-to-label', convertFunctionToLabel],
            ['ishvara/convert-await-to-call', convertAwaitToCall],
            ['ishvara/split-stack-operations', splitStackOperations],
        ],
    });
    
    return code;
};
