module.exports.report = () => `Use 'db' instead of 'var'`;

module.exports.replace = () => ({
    'var __a = __b': '__a, db, __b',
});
