export const MemberExpression = (path, {print}) => {
    const {computed, property} = path.node;
    print('__object');
    print(' ');
    
    if (computed)
        print(property.value);
    else
        print('__property');
};
