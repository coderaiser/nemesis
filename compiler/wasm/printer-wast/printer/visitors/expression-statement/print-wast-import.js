import {types} from '@putout/babel';

const {isCallExpression} = types;

export const isWastImport = (expression) => {
    if (!isCallExpression(expression))
        return;
    
    const {name} = expression.node.callee;
    
    return name === '__ishvara_wast_import';
};

export function printWastImport(path, {print, maybe}) {
    const [first, second, funcName, ...funcArgs] = path.get('arguments');
    
    print('(import ');
    
    print(first);
    print(' ');
    print(second);
    print(' ');
    print('(func ');
    print(`$${funcName} `);
    
    const n = funcArgs.length - 1;
    
    for (const [i, funcArg] of funcArgs.entries()) {
        print(`(param ${funcArg})`);
        maybe.print.space(i < n);
    }
    
    print(')');
    print(')');
}

