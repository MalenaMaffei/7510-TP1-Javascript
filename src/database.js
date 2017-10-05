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
            throw new InvalidEntryException(fact);
        }
        this.facts.push(fact);
    }

    this.addRule = function(rule) {
        if (this.ruleExists(rule)) {
            throw new InvalidEntryException(rule);
        }
        this.rules.push(rule);
    }


    // this.checkQuery = function(query) {
    //     if (!this.factExists(query)) {
    //         return this.ruleExists(query)
    //     }
    //     return true;
    // }
};

module.exports = Database;