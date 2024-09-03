export const ExpressionStatement = (path, {print, indent}) => {
    indent();
    print('__expression');
    print.newline();
}