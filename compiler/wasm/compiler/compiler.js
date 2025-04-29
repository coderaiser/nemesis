import putout from 'putout';
import * as pluginWastTS from './putout-plugin-wast-ts/lib/index.js';
import {printWast} from './printer-wast/printer-wast.js';

export const compile = (source) => {
    const {code: plainWastTs} = putout(source, {
        fix: true,
        isTS: true,
        plugins: [
            ['wast-ts', pluginWastTS],
        ],
    });
    
    return printWast(plainWastTs);
};
