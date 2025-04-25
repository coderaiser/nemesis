export const report = () => `Use hex index of dec`;

export const fix = (path) => {
    const {value} = path.node;
    path.node.raw = '0x' + value.toString(16);
};

export const include = () => [
    'NumericLiteral',
];
