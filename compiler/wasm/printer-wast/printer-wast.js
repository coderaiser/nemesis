import {parse} from 'putout';
import {print} from './printer/printer.js';

export const printWast = (source) => {
    const ast = parse(source, {
        isTS: true,
    });
    
    return print(ast);
};

