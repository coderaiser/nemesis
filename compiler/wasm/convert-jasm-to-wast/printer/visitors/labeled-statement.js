export const LabeledStatement = (path, {print, indent}) => {
    print('__label');
    print(':');
    indent.inc();
    print.newline();
    print('__body');
    indent.dec();
};
