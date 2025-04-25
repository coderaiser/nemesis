import {safeAlign} from 'eslint-plugin-putout';

export default [
    ...safeAlign, {
        ignores: ['example.*', '**/fixture'],
    },
];
