import {types} from '@putout/babel';

const {isMemberExpression} = types;

export const report = () => `Use 'mov()' instead of '='`;

export const match = () => ({
    '__a = __b': ({__a}, path) => {
        return !isMemberExpression(__a);
    },
});

export const replace = () => ({
    '__a = __b': 'mov(__a, __b)',
});

