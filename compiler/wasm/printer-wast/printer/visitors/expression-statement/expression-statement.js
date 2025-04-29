import {
    isWastImport,
    printWastImport,
} from './print-wast-import.js';

export const ExpressionStatement = (path, {print, indent}) => {
    const expression = path.get('expression');
    
    if (isWastImport(expression)) {
        printWastImport(expression, {
            print,
        });
        print.breakline();
        
        return;
    }
    
    indent();
    print('__expression');
    print.newline();
};

