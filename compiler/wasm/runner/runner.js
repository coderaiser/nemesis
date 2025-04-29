export const run = (wasm, imports) => {
    const mod = new WebAssembly.Module(wasm);
    const {exports} = new WebAssembly.Instance(mod, imports);
    
    return exports;
};
