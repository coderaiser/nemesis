export const report = () => `Avoid useless declarations`;

export const replace = () => ({
    'import __imports from "#wast-ts"': '',
    'export const stack = []': '',
    'const __a = create(__b)': '',
});
