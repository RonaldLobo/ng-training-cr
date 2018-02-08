
'use strict';
var jwt = require('jsonwebtoken');
var TOKEN_ALGO = 'HS256';
var TOKEN_EXPIRES = '2 days';
var InvalidCredentialsException = require(__base + 'server/exceptions/InvalidCredentials');

function signToken(data) {
    logger.debug('Auth: signToken');

    var token = jwt.sign(data, 'secret',{
        algorithm: TOKEN_ALGO,
        expiresIn:TOKEN_EXPIRES
    });
    return {
        type: 'bearer',
        token
    };
}

function verifyToken(token, callback) {
    logger.debug('Auth: verifyToken');
    jwt.verify(token, 'secret', {algorithms: [TOKEN_ALGO]},
        function(error, decoded) {
            if (error) {
                logger.error('Auth: verifyToken failed: ', error.message);
                var clientError = new InvalidCredentialsException();
                return callback(clientError);   
            } else {
                logger.debug('Auth: verifyToken success');
                return callback(null, decoded);
            }
        });
}

module.exports = {
    signToken,
    verifyToken
};
