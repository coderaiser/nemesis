import {hasCoupleTrailingComments} from '@putout/printer/is';

export const Program = (path, printer, semantics) => {
    const {body} = path.node;
    const {
        traverse,
        write,
        indent,
    } = printer;
    
    traverse(path.get('interpreter'));
    write('(');
    write('module');
    indent.inc();
    write.breakline();
    
    path.get('body').forEach(traverse);
    indent.dec();
    write.newline();
    write(')');
    
    if (body.length && hasCoupleTrailingComments(body.at(-1)))
        return;
    
    write.endOfFile();
};

