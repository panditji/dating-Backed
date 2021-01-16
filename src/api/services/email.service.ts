import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';

import { logger }  from '../utils';

const environment = process.env.NODE_ENV;
let workerScriptPath = './dist/api/services/workers/mailer.js';
if (environment === 'development') {
    workerScriptPath = './src/api/services/workers/mailer.js';
}
const worker = new Worker(workerScriptPath, {});

worker.on('message', (result: any) => {
    logger.info('msg from worker =>', result);
})

function emailWorkerService() {
    async function mailer(msg: any) {
        worker.postMessage(msg);
    }
    return { mailer };
};

export default emailWorkerService;
