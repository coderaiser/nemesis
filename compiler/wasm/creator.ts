const isFn = (a): a is Function => typeof a === 'function';

export const create = ({stack, imports}) => {
    const push = stack.push.bind(stack);
    const pop = stack.pop.bind(stack);
    
    const i32 = createI32({
        push,
        pop,
    });
    const local = createLocal({
        push,
        pop,
    });
    const call = createCall(imports);
    
    return {
        i32,
        local,
        call,
    };
};

const createCall = (imports) => (name, ...args) => {
    if (isFn(name))
        return name(...args);
    
    for (const [, currentName, fn, override] of imports) {
        if (name !== currentName)
            continue;
        
        const currentFn = override || fn;
        
        return currentFn(...args);
    }
    
    throw Error(`[call]: '${name}' not found`);
};

const createI32 = ({push, pop}) => ({
    const: push,
    add: createAdd({
        push,
        pop,
    }),
});

const createLocal = ({push, pop}) => ({
    get: push,
});

const createAdd = ({push, pop}) => (a?: i32, b?: i32) => {
    push(pop() + pop());
};

