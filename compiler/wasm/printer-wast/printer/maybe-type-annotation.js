export const maybeTypeAnnotation = (visit) => (path, printer, semantics) => {
    visit(path, printer, semantics);
    
    maybePrintTypeAnnotation(path, printer);
};

export function maybePrintTypeAnnotation(path, printer) {
    const {typeAnnotation} = path.node;
    const {write, traverse} = printer;
    
    if (typeAnnotation) {
        write.space();
        traverse(path.get('typeAnnotation'));
    }
}

