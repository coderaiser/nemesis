export const report = () => `Use 'db' instead of 'var'`;

export const replace = () => ({
    'var __a = __b': '__a, db, __b',
});
