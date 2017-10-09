var RuleValidator = require('./ruleValidator');
var FactValidator = require('./factValidator');
var InvalidEntryException = require('./invalidEntryException');
var Database = require('../src/database');
var Fact = require('../src/fact');
var Rule = require('../src/rule');
var Query = require('../src/query');


var NAMEPOS = 1;
var VALUEPOS = 2;
var FACTSPOS = 3;
var factSyntax = /^([a-z\-]+)\(([a-z\-]+(, [a-z\-]+){0,})\).$/i
var querySyntax = /^([a-z\-]+)\(([a-z\-]+(, [a-z\-]+){0,})\)$/i
var ruleSyntax = /^([a-z\-]+)\(([A-Z](?:, [A-Z]+){0,})\) :\- ([a-z\-]+\([A-Z](, [A-Z]+){0,}\)(, [a-z\-]+\([A-Z](, [A-Z]+){0,}\)){0,})\.$/

var Parser = function() {
    this.parseDatabase = function(strDb) {
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

    this.getName = function(matches){
        return (matches[NAMEPOS]);
    }

    this.getValues = function(matches){
        return (matches[VALUEPOS].split(', '));
    }

    this.getFacts = function(matches){
        var facts = matches[FACTSPOS].replace(/(\w+),\s+/g,'$1,').split(', ');
        facts = facts.map((fact, i) => {
            fact = fact + '.';
            fact = fact.replace(',', ', ');
            return(this.parseFact(fact));
        });
        return(facts)
    }

    this.parseRule = function(ruleStr) {
        var matches = this.getMatches(ruleStr, ruleSyntax);
        var name = this.getName(matches);
        var values = this.getValues(matches);
        var facts = this.getFacts(matches);
        var rule = new Rule(name, values, facts);
        return (rule);
    }

    this.parseFact = function(factStr){
        var matches = this.getMatches(factStr, factSyntax);
        var name = this.getName(matches);
        var values = this.getValues(matches);
        var fact = new Fact(name, values);
        return(fact);
    }


    this.parseQuery = function(queryStr) {
        if (this.isValidQuery(queryStr)){
            var matches = this.getMatches(queryStr, querySyntax);
            var name = this.getName(matches);
            var values = this.getValues(matches);
            var query = new Query(name, values);
            return (query);
        }
        throw new InvalidEntryException(queryStr + " does not comply with query syntax.");
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

    this.isValidQuery = function(query){
        return (this.getMatches(query, querySyntax) !== null);
    }
};

module.exports = Parser;
