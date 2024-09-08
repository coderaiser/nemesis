import putout from 'putout';
import * as convertVarToDb from './convert-var-to-db/index.js';
import * as moveVarsToBottom from './move-vars-to-bottom/index.js';
import * as convEquCallToMember from './convert-equ-call-to-member/index.js';
import * as convertDecToHex from './convert-dec-to-hex/index.js';
import * as convertAssignToMember from './convert-assign-to-member/index.js';
import * as convertAssignToAdd from './convert-assign-to-add/index.js';

export const ishvaraToJasm = (source) => {
    const {code} = putout(source, {
        plugins: [
            ['ishvara/move-vars-to-bottom', moveVarsToBottom],
            ['ishvara/convert-vars-to-db', convertVarToDb],
            ['ishvara/convert-dec-to-hex', convertDecToHex],
            ['ishvara/convert-equ-call-to-member', convEquCallToMember],
            ['ishvara/convert-assign-to-member', convertAssignToMember],
            ['ishvara/convert-assign-to-add', convertAssignToAdd],
        ],
    });
    
    return code;
};
