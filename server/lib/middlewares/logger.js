/* * :remote-addr 
     :remote-user 
     :method 
     :url HTTP/
     :http-version 
     :status 
     :res[content-length] - 
     :response-time ms */

const random = function() {
        return Math.floor(Math.pow(10, 9) + Math.random() * (Math.pow(10, 10) - Math.pow(10, 9) - 1));
};

const getCurrentTime = () => {
    return `\x1b[36m${new Date().toUTCString()}\x1b[0m`;
}


const getToken = () => {
    return `[\x1b[33m${random()}\x1b[0m]`
}

const getHTTPMethod = request => {
    return request.method === 'DELETE' ? `\x1b[31m${request.method}\x1b[0m` : `\x1b[32m${request.method}\x1b[0m`
}

const getURL = request => {
    return request.originalUrl
}


const getStatusCode = response => {
    if(response.statusCode >= 500) {
        return `\x1b[31m${response.statusCode}\x1b[0m`;
    }

    if (response.statusCode >= 400) {
        console.log('Warn');
        return `\x1b[31m${response.statusCode}\x1b[0m`;
    }

    return `\x1b[32m${response.statusCode}\x1b[0m`;
}

const getIP = request => {
    return request.headers['x-forwarded-for'] || request.connection.remoteAddress || request.socket.remoteAddress ||(request.connection.socket ? request.connection.socket.remoteAddress : null)
}

const getUserAgent = request => {
    return request.headers['user-agent']
}

getStatusMessage = response => {
    return response.statusMessage;
}

getContentLength = response => {
    return response.get('Content-Length') || 0 
}

exports.logger = (request, response, next) => {
    response.on('finish', () => {
        console.log(`${getCurrentTime()} ${getToken()} ${getHTTPMethod(request)} ${getURL(request)} ${getStatusCode(response)} ${getStatusMessage(response)} ${getContentLength(response)}b sent  ${getIP(request)} ${getUserAgent(request)}`)
    })

    response.on('close', () => {
        console.log(`${getCurrentTime()} ${getToken()} ${getHTTPMethod(request)} ${getURL(request)} ${getStatusCode(response)} ${getStatusMessage(response)} ${getContentLength(response)}b sent  ${getIP(request)} ${getUserAgent(request)}`)
    })

    response.on('error', () => {
        console.log(`${getCurrentTime()} ${getToken()} ${getHTTPMethod(request)} ${getURL(request)} ${getStatusCode(response)} ${getStatusMessage(response)} ${getContentLength(response)}b sent  ${getIP(request)} ${getUserAgent(request)}`)
    })

     next()
}