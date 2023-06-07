const { isMainThread, Worker, workerData } = require('worker_threads')

if (isMainThread){
    new Worker(__filename, {
        workerData: [1, 1, 2, 8, 5, 2, 0, 4]
    })
    new Worker(__filename, {
        workerData: [4, 2, 0, 5, 2, 0]
    })
    console.log(process.pid)

} else {
    console.log('I\'m a worker, sell my soul for the capitalist')
    console.log(process.pid)
    console.log(workerData.sort())
}