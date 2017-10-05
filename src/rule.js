var Query = require('../src/query');

var Rule = function(name, values, facts) {
    Query.call(this, name, values);
    // this.name = name;
    // this.values = values;
    this.facts = facts;

    this.equals = function(query) {
        return (this.name == query.name);
    }

    this.getFacts = function(params) {
        // aca tendria que hacer un mapa en el que tenga X: param.1 , Y: param.2
        // y despues directamente reemplazo en mis facts mismo names pero distintos vals.
        // esto se tiene que hacer afuera creo, en el interprete.
        return this.facts;
    }
}

module.exports = Rule;