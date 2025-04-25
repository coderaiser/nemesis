import {operator} from 'putout';

const {remove} = operator;

export const report = () => `Move 'var' to bottom of the file`;

export const fix = (path) => {
    delete path.node.leadingComments;
    delete path.node.trailingComments;
    
    path.parentPath.node.body.push(path.node);
    remove(path);
};
export const traverse = ({push}) => ({
    VariableDeclaration(path) {
        const prev = path.getPrevSibling();
        
        if (!prev.node)
            push(path);
    },
});
