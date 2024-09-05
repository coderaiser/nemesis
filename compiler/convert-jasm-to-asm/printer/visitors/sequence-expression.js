export const SequenceExpression = (path, {traverse, write}) => {
    const expressions = path.get('expressions');
    
    for (const expression of expressions) {
        traverse(expression);
        write(' ');
    }
};

