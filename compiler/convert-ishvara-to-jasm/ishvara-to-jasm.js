import putout from 'putout';
import * as convertVarToDb from './convert-var-to-db/index.js';
import * as moveVarsToBottom from './move-vars-to-bottom/index.js';
import * as convEquCallToMember from './convert-equ-call-to-member/index.js';
import * as convertDecToHex from './convert-dec-to-hex/index.js';
import * as convertAssignmentToMember from './convert-assignment-to-member/index.js';

export const ishvaraToJasm = (source) => {
    const {code} = putout(source, {
        plugins: [
            ['ishvara/move-vars-to-bottom', moveVarsToBottom],
            ['ishvara/convert-vars-to-db', convertVarToDb],
            ['ishvara/convert-dec-to-hex', convertDecToHex],
            ['ishvara/convert-equ-call-to-member', convEquCallToMember],
            ['ishvara/convert-assignment-to-member', convertAssignmentToMember],
        ],
    });
    
    return code;
};
