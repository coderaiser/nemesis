export const report = () => `Use 'shl()' instead of 'assign'`;

export const replace = () => ({
    '__a <<= 4': 'shl(__a, 4)',
});
