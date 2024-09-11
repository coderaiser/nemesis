import {types, operator} from 'putout';

const {replaceWithMultiple} = operator;
const {CallExpression} = types;

export const report = ({node}) => {
    const {callee} = node;
    const {name} = callee;
    
    return `Split '${name}(__array)' to couple calls`;
};

export const fix = (path) => {
    const {callee} = path.node;
    const [first] = path.get('arguments');
    const {elements} = first.node;
    const nodes = [];
    
    for (const element of elements) {
        nodes.push(CallExpression(callee, [element]));
    }
    
    replaceWithMultiple(path, nodes);
};

export const include = () => [
    'push(__array)',
    'pop(__array)',
];
