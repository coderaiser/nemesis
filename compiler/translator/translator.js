export const translate = (source) => {
    const array = new Uint8Array();
    const lines = source.split('\n');
    
    for (const line of lines) {
        console.log(line);
        //array.push(...)
    }
    
    return array;
};
