var Rule = require('./rule');
var Fact = require('./fact');
var InvalidEntryException = require('./invalidEntryException');


var Database = function() {
    this.rules = [];
    this.facts = [];

    this.entryExists = function(collection, entry) {
        for (var i = 0; i < collection.length; i++) {
            if (collection[i].equals(entry)) {
                return true;
            }
        }
        return false;
    };

    this.factExists = function(fact) {
        return this.entryExists(this.facts, fact);
    };

    this.ruleExists = function(rule) {
        return this.entryExists(this.rules, rule);
    };

    this.addFact = function(fact) {
        if (this.factExists(fact)) {
            throw new InvalidEntryException(fact + " is a duplicate.");
        }
        this.facts.push(fact);
    }

    this.addRule = function(rule) {
        if (this.ruleExists(rule)) {
            throw new InvalidEntryException(rule + " is a duplicate.");
        }
        this.rules.push(rule);
    }

    this.getRule = function(query) {
        for (var i = 0; i < this.rules.length; i++) {
            if (this.rules[i].equals(query)) {
                return this.rules[i];
            }
        }
        throw new InvalidEntryException(query + " rule does not exist.");
    }
};

module.exports = Database;
