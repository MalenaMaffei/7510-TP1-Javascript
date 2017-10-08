var RuleValidator = require('./ruleValidator');
var FactValidator = require('./factValidator');
var InvalidEntryException = require('./invalidEntryException');
var Database = require('../src/database');


var factSyntax = /^[a-z\-]+\([a-z\-]+(, [a-z\-]+){0,}\)\.$/
var querySyntax = /^[a-z\-]+\([a-z\-]+(, [a-z\-]+){0,}\)$/
var ruleSyntax = /^[a-z\-]+\([A-Z](, [A-Z]+){0,}\) :\- [a-z\-]+\([A-Z](, [A-Z]+){0,}\)(, [a-z\-]+\([A-Z](, [A-Z]+){0,}\)){0,}\.$/

var Parser = function() {
    this.parseDatabase = function(database) {
        // returns Database object created from a list format database.
        // var rules = [];
        // var facts = [];
        // TODO: CAMBIAR NOMBRES DATABASE Y DB
        var db = new Database();
        database.map((entry, i) => {
            // if parser error :throw new InvalidDatabaseException(entry);
            // parse line
            // if rule: database.addRule;
            // if else isFact: database.addFact;
            // else throw error
            if(this.isValidFact(entry)){

            } else if (this.isValidRule(entry)) {

            } else {
                throw new InvalidEntryException(entry + " does not comply with either fact or rule syntax.");
            }
        });

    }

    this.parseQuery = function(query) {

    }

    this.isValidFact = function(line){
        return (line.match(factSyntax) !== null);
    }

    this.isValidRule = function(line){
        return (line.match(ruleSyntax) !== null);
    }
};

module.exports = Parser;
