export const MemberExpression = (path, {print}) => {
    const {computed, property} = path.node;
    print('__object');
    print(' ');
    
    print('__property');
};

