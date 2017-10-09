var QueryParser = require('../src/queryParser');
var FactParser = require('../src/factParser');
var Fact = require('../src/fact');
var Rule = require('../src/rule');

var RuleParser = function() {
    QueryParser.call(this);
    this.FACTSPOS = 3;
    this.syntax = /^([a-z\-]+)\(([A-Z](?:, [A-Z]+){0,})\) :\- ([a-z\-]+\([A-Z](, [A-Z]+){0,}\)(, [a-z\-]+\([A-Z](, [A-Z]+){0,}\)){0,})\.$/

    this.parse = function(ruleStr) {
        if (this.isValidEntry(ruleStr)){
            var matches = this.getMatches(ruleStr);
            var name = this.getName(matches);
            var values = this.getValues(matches);
            var facts = this.getFacts(matches);
            var rule = new Rule(name, values, facts);
            return (rule);
        }
        // throw new InvalidEntryException(factStr + " does not comply with fact syntax.");
    }

    this.getFacts = function(matches){
        var facts = matches[this.FACTSPOS].replace(/(\w+),\s+/g,'$1,').split(', ');
        facts = facts.map((fact, i) => {
            fact = fact + '.';
            fact = fact.replace(',', ', ');
            var factParser = new FactParser();
            return(factParser.parse(fact));
        });
        return(facts)
    }
}

module.exports = RuleParser;
