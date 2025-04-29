import {maybeTypeAnnotation} from '../maybe-type-annotation.js';

export const Identifier = maybeTypeAnnotation((path, printer) => {
    const {
        write,
        maybe,
        traverse,
        print,
    } = printer;
    
    const {node} = path;
    const {name, optional} = node;
    
    write(name);
    maybe.write(optional, '?');
});

