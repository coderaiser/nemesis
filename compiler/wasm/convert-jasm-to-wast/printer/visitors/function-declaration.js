import {types} from '@putout/babel';
import {isNext, isNextParent} from '@putout/printer/is';
import {printParams} from '../params.js';

const not = (fn) => (...a) => !fn(...a);
const notInsideExportDefaultWithBody = not(isInsideExportDefaultWithBody);

const {
    isAssignmentExpression,
    isTSModuleBlock,
    isBlockStatement,
    isExportNamedDeclaration,
    isExpressionStatement,
    isFunctionDeclaration,
    isExportDefaultDeclaration,
} = types;

const isInsideNamedExport = ({parentPath}) => isExportNamedDeclaration(parentPath);

export const FunctionDeclaration = {
    print(path, printer, semantics) {
        const {print, maybe} = printer;
        
        const {
            async,
            generator,
            returnType,
        } = path.node;
        
        maybe.indent(!isInsideNamedExport(path));
        maybe.print(async, 'async ');
        
        print('(');
        print('func');
        
        if (!generator) {
            print(' ');
        } else {
            print('*');
            print.space();
        }
        
        print('$');
        print('__id');
        
        if (path.parentPath.isExportNamedDeclaration()) {
            print(' ');
            print('(');
            print('export ');
            print('"');
            print('__id');
            print('"');
            print(')');
            print(' ');
        }
        
        printParams(path, printer, semantics, {
            braceOpen: '(param ',
        });
        
        if (returnType) {
            print.space();
            print('(');
            print('result ');
            print('__returnType');
            print(')');
        }
        
        print('__body');
        print(')');
    },
    afterSatisfy: () => [isNext, isNextParent, isInsideBlockStatement],
    after(path, {indent, maybe}) {
        if (isNextAssign(path) || isNextFunction(path) || isNext(path))
            indent();
        
        maybe.write.newline(notInsideExportDefaultWithBody(path));
    },
};

const isNextFunction = (path) => {
    const next = path.getNextSibling();
    return isFunctionDeclaration(next);
};

const isNextAssign = (path) => {
    const next = path.getNextSibling();
    
    if (!isExpressionStatement(next))
        return false;
    
    return isAssignmentExpression(next.node.expression);
};

function isInsideBlockStatement(path) {
    const {parentPath} = path;
    
    if (isTSModuleBlock(parentPath.parentPath))
        return true;
    
    if (!isBlockStatement(parentPath))
        return false;
    
    return !path.node.body.body.length;
}

function isInsideExportDefaultWithBody(path) {
    if (!isExportDefaultDeclaration(path.parentPath))
        return false;
    
    return path.node.body.body.length;
}

