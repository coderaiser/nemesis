import {parse} from 'putout';
import {print} from './printer/printer.js';

export const jasmToAsm = (source) => {
    const ast = parse(source);
    
    return print(ast);
};
