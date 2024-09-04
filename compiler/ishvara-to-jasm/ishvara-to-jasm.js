import putout from 'putout';
import * as convertVarToDb from './convert-var-to-db/index.js';
import * as moveVarsToBottom from './move-vars-to-bottom/index.js';

export const ishvaraToJasm = (source) => {
    const {code} = putout(source, {
        plugins: [
            ['ishvara/move-vars-to-bottom', moveVarsToBottom],
            ['ishvara/convert-vars-to-db', convertVarToDb],
        ],
    });
    
    return code;
};

