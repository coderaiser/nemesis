import {types} from 'putout';

const {
    CallExpression,
    ArrayExpression,
    Identifier,
    ExpressionStatement,
} = types;

export const report = () => `Use 'label' instead of 'function'`;

export const replace = () => ({
    'function __a<__type_params>(): __b {__body}': ({__b, __type_params, __body}) => {
        addStackOperations({
            __type_params,
            __body,
        });
        
        __body.body.push(ExpressionStatement(__b.typeName));
        
        return '__a: __body';
    },
    'function __a<__type_params>() {__body}': ({__type_params, __body}) => {
        addStackOperations({
            __type_params,
            __body,
        });
        __body.body.push(ExpressionStatement(Identifier('ret')));
        
        return '__a: __body';
    },
});

function addStackOperations({__type_params, __body}) {
    const args = [];
    
    for (const {name} of __type_params) {
        args.push(name);
    }
    
    const push = createStackOperation('push', args);
    const pop = createStackOperation('pop', args
        .slice()
        .reverse());
    
    __body.body.unshift(push);
    __body.body.push(pop);
}

function createStackOperation(name, args) {
    const callee = Identifier(name);
    const params = [
        ArrayExpression(args),
    ];
    
    return ExpressionStatement(CallExpression(callee, params));
}
