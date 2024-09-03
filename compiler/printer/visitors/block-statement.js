export const BlockStatement = (path, {traverse}) => {
    const body = path.get('body');
    
    for (const element of body) {
        traverse(element);
    }
};
