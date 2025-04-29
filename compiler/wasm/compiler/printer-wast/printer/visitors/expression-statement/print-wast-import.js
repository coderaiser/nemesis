import {types} from '@putout/babel';

const {isCallExpression} = types;

export const isWastImport = (expression) => {
    if (!isCallExpression(expression))
        return;
    
    const {name} = expression.node.callee;
    
    return name === '__ishvara_wast_import';
};

export function printWastImport(path, printer) {
    const {
        print,
        maybe,
    } = printer;
    
    const [first, second, func] = path.get('arguments');
    
    print('(import ');
    
    print(first);
    print(' ');
    print(second);
    print(' ');
    print('(func ');
    
    const {name: funcName} = func.node.id;
    const funcArgs = func.get('params');
    const returnType = getReturnType(func);
    
    print(`$${funcName} `);
    
    const n = funcArgs.length - 1;
    
    for (const [i, funcArg] of funcArgs.entries()) {
        printParam(funcArg, printer);
        maybe.print.space(i < n);
    }
    
    if (returnType) {
        print.space();
        print('(result ');
        print(returnType);
        print(')');
    }
    
    print(')');
    print(')');
}

function getReturnType(func) {
    const [first] = func.get('body.body');
    
    if (!first)
        return null;
    
    return first.get('argument');
}

function printParam(funcArg, {print}) {
    const {name, typeAnnotation} = funcArg.node;
    
    if (!typeAnnotation) {
        print(`(param `);
        print(name);
        print(`)`);
        
        return;
    }
    
    print(`(param `);
    print(`$${name} `);
    print(funcArg.get('typeAnnotation.typeAnnotation'));
    print(`)`);
}

