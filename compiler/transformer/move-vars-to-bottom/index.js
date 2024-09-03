const {operator: operator} = require('putout');
const {remove} = operator;

module.exports.report = () => `Move 'var' to bottom of the file`;

module.exports.fix = (path) => {
    delete path.node.leadingComments;
    delete path.node.trailingComments;
    
    path.parentPath.node.body.push(path.node);
    remove(path);
};
module.exports.traverse = ({push}) => ({
    VariableDeclaration(path) {
        const prev = path.getPrevSibling();
        
        if (!prev.node)
            push(path);
    },
});
