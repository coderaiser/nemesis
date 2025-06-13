import {run} from 'madrun';

export default {
    'build': () => 'sh ./scripts/build.sh',
    'clean': () => 'sh ./scripts/clean.sh',
    'start': async () => [
        await run('build'),
        'cp nemesis* ../nemesis-emulator/',
        'cd ../nemesis-emulator',
        'cloudcmd --root .',
        'cd ../nemesi',
    ].join('&&'),
};
