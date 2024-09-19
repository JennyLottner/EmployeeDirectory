import fs from 'fs'

const logsDir = './logs'   // Directory for storing log files
if (!fs.existsSync(logsDir)) {  // Check if the logs directory exists, and create it if not
    fs.mkdirSync(logsDir)
}

// Define the time format for log entries
function getTime() {
    let now = new Date()
    return now.toLocaleString('he')
}

// Check if the given argument is an error object
function isError(e) {
    return e && e.stack && e.message
}

// Log message function
function doLog(level, ...args) {
    const strs = args.map(arg =>
        (typeof arg === 'string' || isError(arg)) ? arg : JSON.stringify(arg)
    )

    var line = strs.join(' | ')
    line = `${getTime()} - ${level} - ${line}\n`
    console.log(line)
    fs.appendFile('./logs/backend.log', line, (err) => {
        if (err) console.log('FATAL: cannot write to log file')
    })
}

// Exported logger object
export const logger = {
    debug(...args) {
        if (process.env.NODE_NEV === 'production') return
        doLog('DEBUG', ...args)
    },
    info(...args) {
        doLog('INFO', ...args)
    },
    warn(...args) {
        doLog('WARN', ...args)
    },
    error(...args) {
        doLog('ERROR', ...args)
    }
}