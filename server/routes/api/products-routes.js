'use strict';
var await = require('asyncawait/await');
var async = require('asyncawait/async');
var handlers = require(__base + 'server/routes/router-handlers');
var service = require(__base + 'server/services');
var routes = require('express').Router();


function getProducts(request, response) {
    console.log('GET product',request.params.id);
    var result;
    try {
        result = await (service.productsService.getProduct(request.params.id));
        return handlers.successResponseHandler(response, result);
    } catch (error) {
    	console.log('error',error);
        return handlers.errorResponseHandler(response, error);
    }
}

function deleteProducts(request, response) {
    console.log('DELETE product');
    var result;
    try {
        result = await (service.productsService.deleteProduct(request.params.id));
        return handlers.successResponseHandler(response, result);
    } catch (error) {
        return handlers.errorResponseHandler(response, error);
    }
}

function updateProducts(request, response) {
    console.log('UPDATE product');
    var result;
    try {
        result = await (service.productsService.updateProduct(request.body.product));
        return handlers.successResponseHandler(response, result);
    } catch (error) {
        return handlers.errorResponseHandler(response, error);
    }
}

function postProducts(request, response) {
    console.log('POST product');
    var result;
    try {
        result = await (service.productsService.postProduct(request.body.product));
        return handlers.successResponseHandler(response, result);
    } catch (error) {
        if(error.code === 11000){
            return handlers.validationErrorHandler(response, error);
        }
        return handlers.errorResponseHandler(response, error);
    }
}

routes.get('/:id', async(getProducts));
routes.get('/', async(getProducts));
routes.delete('/:id', async(deleteProducts));
routes.put('/:id', async(updateProducts));
routes.post('/', async(postProducts));

module.exports = routes;