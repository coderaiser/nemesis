import {safeAlign, safeRules} from 'eslint-plugin-putout';

export default [
    ...safeAlign, {
        rules: {
            "putout/putout": ["error", {
                "rules": {
                    ...safeRules,
                    "tape/add-t-end": "off",
                }
            }]
        },
        ignores: ['example.*', '**/fixture'],
    },
];
