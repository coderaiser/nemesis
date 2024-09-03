const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['move-vars-to-bottom', plugin],
    ],
});

test('compiler: move-vars-to-bottom: report', (t) => {
    t.report('move-vars-to-bottom', `Move 'var' to bottom of the file`);
    t.end();
});

test('compiler: move-vars-to-bottom: transform', (t) => {
    t.transform('move-vars-to-bottom');
    t.end();
});
