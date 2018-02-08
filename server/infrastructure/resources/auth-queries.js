'use strict';
var arfClient = require(__base + 'server/configuration').arfClient;
var logger = require(__base + 'server/configuration').logger;
var NotFoundException = require(__base + 'server/exceptions/NotFound');
var NoAuthException = require(__base + 'server/exceptions/NoAuthException');
var ResourceRequestException = require(__base + 'server/exceptions/ResourceRequestException');

function findById(gigyaId) {
    logger.debug('Queries: findById using ', gigyaId);
    return arfClient.get('accounts/', { gigyaId: gigyaId })
        .then(function(result) {
            if (result.error || result.length === 0) {
                if (result.error) {
                    logger.error(result.error.stack);    
                } else {
                    logger.error(result);    
                }
                throw new NotFoundException('Login Failed. User not found');
            }
            logger.debug('Queries: account found with id ', result[0].id);
            logger.debug('Queries: account found ', result[0]);
            return result[0];
        })
        .catch(function(reason) {
            logger.error(reason);
            throw reason;
        });
}

function findAccountDetails(accountId) {
    logger.debug('Queries: findAccountDetails using ', accountId);
    return arfClient.get('accounts/' + accountId + '/profiles/classifieds')
        .then(function(result) {
            logger.debug('Queries: findAccountDetails found');
            if (result.statusCode && !(/^2/.test('' + result.statusCode))) { 
                if (result.statusCode === 403) {
                    throw new NoAuthException(result.message, result.statusCode);
                } else {                                    
                    throw new ResourceRequestException(result.message, result.statusCode);
                }
            }
            return result;
        })
        .catch(function(reason) {
            logger.error(reason);
            throw reason;
        });
}

module.exports = {
    findById,
    findAccountDetails
};