import createWabt from 'wabt';

export const translate = async (name, wast) => {
    const wabt = await createWabt();
    const parsedWat = wabt.parseWat(name, wast);
    
    const {buffer} = parsedWat.toBinary({
        log: false,
    });
    
    return buffer;
};

