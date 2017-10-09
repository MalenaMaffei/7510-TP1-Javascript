var RuleValidator = require('./ruleValidator');
var FactValidator = require('./factValidator');
var InvalidEntryException = require('./invalidEntryException');
var Database = require('../src/database');
var Fact = require('../src/fact');
var Rule = require('../src/rule');

var factSyntax = /^([a-z\-]+)\(([a-z\-]+(, [a-z\-]+){0,})\).$/i
var querySyntax = /^([a-z\-]+)\(([a-z\-]+(, [a-z\-]+){0,})\)$/i
var ruleSyntax = /^([a-z\-]+)\(([A-Z](?:, [A-Z]+){0,})\) :\- ([a-z\-]+\([A-Z](, [A-Z]+){0,}\)(, [a-z\-]+\([A-Z](, [A-Z]+){0,}\)){0,})\.$/

var Parser = function() {
    this.parseDatabase = function(strDb) {
        // returns Database object created from a list format database.
        // var rules = [];
        // var facts = [];
        // TODO: CAMBIAR NOMBRES DATABASE Y DB
        var db = new Database();
        strDb.map((entry, i) => {
            if(this.isValidFact(entry)){
                var fact = this.parseFact(entry);
                db.addFact(fact);
            } else if (this.isValidRule(entry)) {
                var rule = this.parseRule(entry);
                db.addRule(rule);
            } else {
                throw new InvalidEntryException(entry + " does not comply with either fact or rule syntax.");
            }
        });
        return(db);

    }

    this.parseRule = function(ruleStr) {
        var matches = this.getMatches(ruleStr, ruleSyntax);
        var name = matches[1];
        var values = matches[2].split(', ');
        var facts = matches[3].replace(/(\w+),\s+/g,'$1,').split(', ');
        facts = facts.map((fact, i) => {
            fact = fact + '.';
            fact = fact.replace(',', ', ');
            return(this.parseFact(fact));
        });
        var rule = new Rule(name, values, facts);
        return (rule);
    }

    this.parseFact = function(factStr){
        var matches = this.getMatches(factStr, factSyntax);
        var name = matches[1];
        var values = matches[2].split(', ');
        var fact = new Fact(name, values);
        return(fact);
    }

    this.parseQuery = function(query) {

    }

    this.getMatches = function(line, syntax){
        return (line.match(syntax));
    }

    this.isValidFact = function(line){
        return (this.getMatches(line, factSyntax) !== null);
    }

    this.isValidRule = function(line){
        return (this.getMatches(line, ruleSyntax) !== null);
    }
};

module.exports = Parser;
