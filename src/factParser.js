var QueryParser = require('../src/queryParser');
var Fact = require('../src/fact');

var FactParser = function() {
    QueryParser.call(this);

    this.syntax = /^([a-z\-]+)\(([a-z\-]+(, [a-z\-]+){0,})\).$/i

    this.parse = function(factStr) {
        if (this.isValidEntry(factStr)){
            var matches = this.getMatches(factStr, this.syntax);
            var name = this.getName(matches);
            var values = this.getValues(matches);
            var fact = new Fact(name, values);
            return (fact);
        }
        // throw new InvalidEntryException(factStr + " does not comply with fact syntax.");
    }
}

module.exports = FactParser;
