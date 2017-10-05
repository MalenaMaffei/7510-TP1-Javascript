var Query = require('../src/query');
var InvalidEntryException = require('./invalidEntryException');

var Rule = function(name, values, facts) {
    Query.call(this, name, values);
    // this.name = name;
    // this.values = values;
    this.facts = facts;

    this.equals = function(query) {
        return (this.name == query.name);
    }

    this.getFacts = function(query) {
        // aca tendria que hacer un mapa en el que tenga X: param.1 , Y: param.2
        // y despues directamente reemplazo en mis facts mismo names pero distintos vals y devuelvo esos nuevos facts.
        if (this.values.length != query.values.length) {
            throw new InvalidEntryException(query + ", incorrect number of arguments, should be " + this.values.length);
        }
        return this.facts;
    }
}

module.exports = Rule;