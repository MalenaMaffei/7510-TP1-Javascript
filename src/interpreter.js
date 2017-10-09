var Fact = require('../src/fact');
var Rule = require('../src/rule');
var Database = require('../src/database');
var Query = require('../src/query');
var Parser = require('../src/parser');

var Interpreter = function() {
    this.db = {};
    this.parser = new Parser();

    this.parseDB = function(dbList) {
        this.db = this.parser.parseDatabase(dbList);
    }

    this.checkQuery = function(queryStr) {
        var query = this.parser.parseQuery(queryStr);
        if(this.db.factExists(query)){
            return(true);
        } else if (this.db.ruleExists(query)) {
            //
        } else {
            return (false);
        }

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
