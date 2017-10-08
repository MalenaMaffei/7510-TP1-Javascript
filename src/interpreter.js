var Fact = require('../src/fact');
var Rule = require('../src/rule');
var Database = require('../src/database');
var Query = require('../src/query');
var Parser = require('../src/parser');

var Interpreter = function() {
    this.db = {};

    this.parseDB = function(params, paramss, paramsss) {

    }

    this.checkQuery = function(params) {
        // Aca es donde tengo que chequear si es una regla o  fact, le Tengo
        // que pasar la query al parser que es el que me va a devolver el objeto.

        return true;
    }

    // EL parseo lo hace el parser, va a llenar la db con rules or facts segun corresponda.
    // DEspues cada query tambien se la doy al parser que va a devolver una query.
    // Yo despues se la paso a la db. Si es factExist, true; else if ruleExist -> evaluate rule; else return false

    this.evaluateRule = function(query) {
        var rule = db.getRule(query);
        var facts = rule.getFacts(query);
        // aca tendria que llenar un map con trues y falses y dsp orarlos
        var factsExistence = facts.map((fact, i ) => {
            return(db.factExists(fact));
        });
// TODO: anded? is that correct?
        const andedFacts = factsExistence.reduce( other && fact);
        return(andedFacts);
    }

}

module.exports = Interpreter;
