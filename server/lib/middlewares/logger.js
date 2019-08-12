/* * :remote-addr 
     :remote-user 
     :method 
     :url HTTP/
     :http-version 
     :status 
     :res[content-length] - 
     :response-time ms */

const random = function() {
    return Math.random().toString(36).substr(2); // remove `0.`
};

const token = function() {
    let token = random() + random();
    return token.substr(1,19).replace(/\D/g, '')
};

exports.logger = (request, response, next) => {
    //console.log('request', request.httpVersion);
    console.log(`\x1b[36m${new Date().toUTCString()}\x1b[0m [\x1b[33m${token()}\x1b[0m] \x1b[32m${request.method}\x1b[0m ${request.url} ${request.httpVersion} ${response.statusCode} ${request.headers['x-forwarded-for'] || request.connection.remoteAddress || request.socket.remoteAddress ||(request.connection.socket ? request.connection.socket.remoteAddress : null), request.headers['user-agent']}`)
    next()
}