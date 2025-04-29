import {types, operator} from 'putout';

const {remove, insertAfter} = operator;

const {
    callExpression,
    identifier,
    isIdentifier,
} = types;

const NAME = '__ishvara_wast_import';

export const report = () => `Use '${NAME}()'`;

export const match = () => ({
    __array: (vars, path) => {
        const {parentPath} = path;
        const {id} = parentPath.node;
        
        return isIdentifier(id, {
            name: 'imports',
        });
    },
});

export const replace = () => ({
    __array: ({__array}, path) => {
        const id = identifier(NAME);
        const {parentPath} = path;
        
        for (const {elements} of __array.elements) {
            const [object, name, fn] = elements;
            const importCall = callExpression(id, elements);
            
            insertAfter(parentPath.parentPath, importCall);
        }
        
        remove(path.parentPath.parentPath);
        return path;
    },
});

