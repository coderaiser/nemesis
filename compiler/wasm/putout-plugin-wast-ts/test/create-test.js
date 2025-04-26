import {readFileSync, writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';
import process from 'node:process';
import {extend} from 'supertape';
import tryCatch from 'try-catch';
import putout from 'putout';
import * as wastTsPlugin from '../index.js';

const {UPDATE} = process.env;

export const createTest = (url) => {
    const filename = fileURLToPath(url);
    const dir = dirname(filename);
    
    return extend({
        compile: compile({
            dir,
        }),
        noCompile: noCompile({
            dir,
        }),
    });
};

const guessFileType = ({dir, name}) => {
    const from = join(dir, 'fixture', `${name}.js`);
    const to = join(dir, 'fixture', `${name}-fix.js`);
    const [error, fromData] = tryCatch(readFileSync, from, 'utf8');
    
    if (error) {
        const from = join(dir, 'fixture', `${name}.ts`);
        const to = join(dir, 'fixture', `${name}-fix.ts`);
        
        return {
            to,
            fromData: readFileSync(from, 'utf8'),
        };
    }
    
    return {
        fromData,
        to,
    };
};

const compile = ({dir}) => (t) => (name) => {
    const {fromData, to} = guessFileType({
        dir,
        name,
    });
    
    const {code} = putout(fromData, {
        fix: true,
        isTS: true,
        plugins: [
            ['wast-ts', wastTsPlugin],
        ],
    });
    
    if (UPDATE === '1') {
        writeFileSync(to, code);
        return t.pass('update fixture');
    }
    
    const toData = readFileSync(to, 'utf8');
    
    return t.equal(code, toData);
};

const noCompile = ({dir}) => (t) => (name) => {
    const from = join(dir, 'fixture', `${name}.gs`);
    const fromData = readFileSync(from, 'utf8');
    
    const result = putoutWastTs(fromData);
    
    return t.equal(result, fromData);
};

