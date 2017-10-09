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
            return (this.evaluateRule(query));
        } else {
            return (false);
        }

    }

    this.evaluateRule = function(query) {
        var rule = this.db.getRule(query);
        var facts = rule.getFacts(query);
        var factsExistence = facts.map((fact, i ) => {
            return(this.db.factExists(fact));
        });
        var andedFacts = factsExistence.reduce((ands, value) => ands && value);
        return(andedFacts);
    }

}

module.exports = Interpreter;
