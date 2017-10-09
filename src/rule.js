var Query = require('../src/query');
var InvalidEntryException = require('./invalidEntryException');
var Fact = require('../src/fact');

var Rule = function(name, values, facts) {
    Query.call(this, name, values);
    this.facts = facts;

    this.equals = function(query) {
        return (this.name == query.name);
    }

    this.getFacts = function(query) {
        if (this.values.length != query.values.length) {
            throw new InvalidEntryException(query + ", incorrect number of arguments, should be " + this.values.length);
        }
        var valuesKeys = this.values;
        var queryValues = query.values;
        var replacementMap = {}
        for (i = 0; i < valuesKeys.length; i++) {
            replacementMap[valuesKeys[i]] = queryValues[i];
        }
        var newFacts = this.facts.map((fact, i) => {
            var newValues = fact.values.map((value, i) => {
                return(replacementMap[value]);
            });
            return(new Fact(fact.name, newValues))
        });
        return newFacts;
    }
}

module.exports = Rule;
