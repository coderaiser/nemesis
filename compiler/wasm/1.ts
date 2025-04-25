import {create, type i32} from './creator';

export const stack = [];
export const imports = [
    ['console', 'log', (message: i32) => {}],
];


const {
    i32,
    local,
    call,
} = create({
    stack,
    imports,
});

export function x(a: i32, b: i32): i32 {
    i32.add(local.get(a), local.get(b));
    call('log');
};
