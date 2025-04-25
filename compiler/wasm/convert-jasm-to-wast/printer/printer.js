import {print as putoutPrint} from '@putout/printer';
import {CallExpression} from './visitors/call-expression.js';
import {BlockStatement} from './visitors/block-statement.js';
import {LabeledStatement} from './visitors/labeled-statement.js';
import {ExpressionStatement} from './visitors/expression-statement.js';
import {SequenceExpression} from './visitors/sequence-expression.js';
import {ExportNamedDeclaration} from './visitors/export-named-declaration.js';
import {FunctionDeclaration} from './visitors/function-declaration.js';
import {Program} from './visitors/program.js';
import {Identifier} from './visitors/identifier.js';

export const print = (ast) => {
    return putoutPrint(ast, {
        visitors: {
            CallExpression,
            BlockStatement,
            LabeledStatement,
            ExpressionStatement,
            SequenceExpression,
            ExportNamedDeclaration,
            FunctionDeclaration,
            Program,
            Identifier,
        },
    });
};

