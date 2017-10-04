var Rule = require('./rule');
var Fact = require('./fact');

var Database = function() {
    this.rules = []
    this.facts = []

    this.checkFact = function(fact) {

    };

    this.checkRule = function(rule) {

    };

    this.checkQuery = function(query) {
        if (!this.checkFact(query)) {
            return this.checkRule(query)
        }
        return true;
    }
};