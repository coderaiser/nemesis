const {isArray} = Array;

const parseArgs = (path) => {
    const argsPath = path.get('arguments');
    
    if (!isArray(argsPath))
        return [];
    
    return argsPath;
};

export function CallExpression(path, {indent, print, maybe, traverse}) {
    const args = parseArgs(path);
    const isParentCall = tooLong(args) && path.parentPath.isCallExpression();
    
    const callee = path.get('callee');
    
    traverse(callee);
    
    maybe.print.space(args.length);
    
    const n = args.length - 1;
    
    maybe.indent.inc(isParentCall);
    
    for (const [i, arg] of args.entries()) {
        const isObject = arg.isObjectExpression();
        
        if (isParentCall && !isObject && n)
            print.breakline();
        
        print(arg);
        
        if (isParentCall && n) {
            print(',');
            continue;
        }
        
        if (i < n)
            print(', ');
    }
    
    if (isParentCall) {
        indent.dec();
        maybe.print.breakline(n);
    }
}

function tooLong(args) {
    for (const arg of args) {
        if (arg.isIdentifier() && arg.node.name.length > 10)
            return true;
    }
    
    return false;
}
