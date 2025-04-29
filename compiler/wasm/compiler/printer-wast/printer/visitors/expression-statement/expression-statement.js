import {
    isWastImport,
    printWastImport,
} from './print-wast-import.js';

export const ExpressionStatement = (path, printer) => {
    const {print, indent} = printer;
    const expression = path.get('expression');
    
    if (isWastImport(expression)) {
        printWastImport(expression, printer);
        print.breakline();
        
        return;
    }
    
    indent();
    print('__expression');
    print.newline();
};

