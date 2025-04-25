export const report = () => `Use 'add(__a, __b)' instead of '__a += __b'`;

export const replace = () => ({
    '__a += __b': 'add(__a, __b);',
});
