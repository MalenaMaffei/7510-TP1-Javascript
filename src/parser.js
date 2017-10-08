var RuleValidator = require('./ruleValidator');
var FactValidator = require('./factValidator');
// var InvalidEntryException = require('./invalidEntryException');
// var Rule = require('./')


var factSyntax = /^[a-z\-]+\([a-z\-]+(, [a-z\-]+){0,}\)\.$/
var ruleSyntax = /^[a-z\-]+\([A-Z](, [A-Z]+){0,}\) :\- [a-z\-]+\([A-Z](, [A-Z]+){0,}\)(, [a-z\-]+\([A-Z](, [A-Z]+){0,}\)){0,}\.$/

var Parser = function() {
    this.parseDatabase = function(database) {
        // returns Database object created from a list format database.
        // var rules = [];
        // var facts = [];
        // database.map((entry, i) => {
            // if parser error :throw new InvalidDatabaseException(entry);
            // parse line
            // if rule: database.addRule;
            // if else isFact: database.addFact;
            // else throw error
            // if()
        // });

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
