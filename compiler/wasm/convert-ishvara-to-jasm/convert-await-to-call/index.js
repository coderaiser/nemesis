import {
    template,
    operator,
    types,
} from 'putout';

const {insertBefore} = operator;
const {ExpressionStatement} = types;

export const report = () => `Use 'call()' operations instead of 'await'`;

const createMov = template('mov(__key, __value)', {
    placeholderPattern: /__[a-z]/,
});

export const replace = () => ({
    'await __a(__object)': ({__object}, path) => {
        for (const {key, value} of __object.properties) {
            const mov = ExpressionStatement(createMov({
                __key: key,
                __value: value,
            }));
            
            insertBefore(path, mov);
        }
        
        const {argument} = path.node;
        
        argument.arguments = [];
        
        return 'call(__a)';
    },
});
