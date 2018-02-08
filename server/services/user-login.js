
'use strict';
var logger = require(__base + 'server/configuration').logger;
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var repository = require(__base + 'server/infrastructure/repositories');
var Auth = require(__base + 'server/model/auth');
var NoAuthException = require(__base + 'server/exceptions/NoAuthException');

function userLogin(gigyaId) {
    var authToken = Auth.signToken({'id':gigyaId});
    return authToken;
}

module.exports = async(userLogin);