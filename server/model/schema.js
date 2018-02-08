'use strict';
var _ = require( 'underscore');

function schema(definition) {
    function Model(props) {
        var keys = _.keys(props);
        for (var i = 0; i < keys.length; i++) {
            this[keys[i]] = props[keys[i]];
        }
    }
    
    Model.prototype.isEqual = _.isEqual;
    
    Model.validate = function(data) {
        var result;
        try {
            result = definition.check(data);
            return result;
        } catch (violation) {
            return violation;
        }
    };
    return Model;
}

module.exports = schema;