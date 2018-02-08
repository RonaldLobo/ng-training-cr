'use strict';
var logger = require(__base + 'server/configuration').logger;
var constants = require('../constants');
var await = require('asyncawait/await');
var async = require('asyncawait/async');
var handlers = require('../router-handlers');
var service = require(__base + 'server/services');
var routes = require('express').Router();

function login(request, response) {
    logger.debug('POST:', request.path, ' ', request.body.gigyaId);
    var gigyaId = request.body.gigyaId;
    var authToken;
    if (!gigyaId) {
        handlers.validationErrorHandler(response, { message: 'Missing UserId parameter' });
    } else {
        try {
            authToken = await (service.userLogin(gigyaId));
            handlers.successResponseHandler(response, authToken);
        } catch (error) {
            handlers.errorResponseHandler(response, error);
        }
    }
}

routes.post('/', async(login));

module.exports = routes;