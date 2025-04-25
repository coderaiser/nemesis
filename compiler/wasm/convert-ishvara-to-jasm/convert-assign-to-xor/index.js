export const report = () => `Use 'xor()' instead of 'assign'`;

export const replace = () => ({
    '__a ^= __a': 'xor(__a, __a)',
});
