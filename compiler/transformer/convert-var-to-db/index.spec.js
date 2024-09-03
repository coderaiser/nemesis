const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['convert-var-to-db', plugin],
    ],
});

test('compiler: convert-var-to-db: report', (t) => {
    t.report('convert-var-to-db', `Use 'db' instead of 'var'`);
    t.end();
});

test('compiler: convert-var-to-db: transform', (t) => {
    t.transform('convert-var-to-db');
    t.end();
});
