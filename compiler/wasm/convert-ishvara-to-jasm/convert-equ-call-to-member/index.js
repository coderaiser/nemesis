import {template, types} from 'putout';

const {
    StringLiteral,
    isStringLiteral,
} = types;

export const report = () => `Use '__a.equ.__b' instead of equ(__a, __b)`;

const createEqu = template('__a.equ[__b]', {
    placeholderPattern: /__[a-z]/,
});

export const replace = () => ({
    'equ(__a, __b)': ({__a, __b}) => {
        return createEqu({
            __a,
            __b: maybeStringLiteral(__b),
        });
    },
});

function maybeStringLiteral(a) {
    if (isStringLiteral(a))
        return a;
    
    const hex = '0x' + Number(a.raw).toString(16);
    
    return StringLiteral(hex);
}
