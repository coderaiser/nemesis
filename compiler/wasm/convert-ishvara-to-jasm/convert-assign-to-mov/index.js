export const report = () => `Use 'mov()' instead of '='`;

export const replace = () => ({
    '__a = __b': 'mov(__a, __b)',
});
