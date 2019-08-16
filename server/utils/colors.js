const chalk = require('chalk')

exports.colors = {
    black: str => {
        return `\x1b[30m${str}\x1b[0m`
    },
    red: str => {
        return `\x1b[31m${str}\x1b[0m`
    },
    green: str => {
        return `\x1b[32m${str}\x1b[0m`
    },
    yellow: str => {
        return `\x1b[33m${str}\x1b[0m`
    },
    blue: str => {
        return `\x1b[34m${str}\x1b[0m`
    },
    magenta: str => {
        return `\x1b[35m${str}\x1b[0m`
    },
    cyan: str => {
        return `\x1b[36m${str}\x1b[0m`
    },
    white: str => {
        return `\x1b[37m${str}\x1b[0m`
    }
}
