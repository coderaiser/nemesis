import {types} from '@putout/babel';

const {
    isStringLiteral,
    isIdentifier,
} = types;
const {isArray} = Array;

const parseArgs = (path) => {
    const argsPath = path.get('arguments');
    
    if (!isArray(argsPath))
        return [];
    
    return argsPath;
};

export function CallExpression(path, {indent, print, maybe, traverse}) {
    const args = parseArgs(path);
    const isParentCall = path.parentPath.isCallExpression();
    
    maybe.print(isParentCall, '(');
    const callee = path.get('callee');
    
    traverse(callee);
    
    maybe.print.space(args.length);
    
    const n = args.length - 1;
    
    maybe.indent.inc(isParentCall);
    
    for (const [i, arg] of args.entries()) {
        const isObject = arg.isObjectExpression();
        
        if (isParentCall && !isObject && n)
            print.breakline();
        
        if (isStringLiteral(arg)) {
            print(`$${arg.node.value}`);
            continue;
        }
        
        if (isIdentifier(arg))
            print('$');
        
        print(arg);
        
        if (isParentCall && n)
            continue;
        
        if (i < n)
            print(' ');
    }
    
    if (isParentCall) {
        indent.dec();
        maybe.print.breakline(n);
    }
    
    maybe.print(isParentCall, ')');
}

