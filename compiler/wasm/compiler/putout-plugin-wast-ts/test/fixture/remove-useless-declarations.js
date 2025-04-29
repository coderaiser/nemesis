import {create} from '#wast-ts';

export const stack = [];

export const imports = [
    ['console', 'log', function log(i32) {
        return i32;
    }],
];

const {
    i32,
    local,
    call,
} = create({
    stack,
    imports,
});
