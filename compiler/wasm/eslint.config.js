import {safeAlign} from 'eslint-plugin-putout';

export default [
    ...safeAlign, {
        ignores: ['example.*', '**/fixture'],
        rules: {
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
        }
    },
];
