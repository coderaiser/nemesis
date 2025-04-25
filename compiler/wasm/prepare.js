const {entries} = Object;

export const prepare = (jswast) => {
    const result = {};
    let stack = [];
    let imports = [];
    
    for (const [name, value] of entries(jswast)) {
        if (name === 'stack') {
            stack = value;
            continue;
        }
        
        if (name === 'imports') {
            imports = value;
            continue;
        }
        
        result[name] = (...args) => {
            value(...args);
            
            return stack[0];
        };
    }
    
    result.declareImport = (module, name, override) => {
        const n = imports.length;
        
        for (let i = 0; i < n; i++) {
            const [currentModule, currentName] = imports[i];
            
            if (module === currentModule && name === currentName) {
                imports[i].push(override);
                return;
            }
        }
    };
    
    result.undeclareImport = (module, name, override) => {
        const n = imports.length;
        
        for (let i = 0; i < n; i++) {
            const [currentModule, currentName, fn] = imports[i];
            
            if (module === currentModule && name === currentName) {
                imports[i].pop();
                return;
            }
        }
    };
    
    return result;
};
