
var InvalidEntryException = require('./invalidEntryException');
var Database = require('../src/database');
var Fact = require('../src/fact');
var Rule = require('../src/rule');
var Query = require('../src/query');
var QueryParser = require('../src/queryParser');
var FactParser = require('../src/factParser');
var RuleParser = require('../src/ruleParser');


var NAMEPOS = 1;
var VALUEPOS = 2;
var FACTSPOS = 3;
var factSyntax = /^([a-z\-]+)\(([a-z\-]+(, [a-z\-]+){0,})\).$/i
var querySyntax = /^([a-z\-]+)\(([a-z\-]+(, [a-z\-]+){0,})\)$/i
var ruleSyntax = /^([a-z\-]+)\(([A-Z](?:, [A-Z]+){0,})\) :\- ([a-z\-]+\([A-Z](, [A-Z]+){0,}\)(, [a-z\-]+\([A-Z](, [A-Z]+){0,}\)){0,})\.$/

var Parser = function() {

    this.fParser = new FactParser();
    this.rParser = new RuleParser();
    this.qParser = new QueryParser();

    this.parseDatabase = function(strDb) {
        var db = new Database();
        strDb.map((entry, i) => {
            if(this.fParser.isValidEntry(entry)){
                var fact = this.fParser.parse(entry);
                db.addFact(fact);
            } else if (this.rParser.isValidEntry(entry)) {
                var rule = this.rParser.parse(entry);
                db.addRule(rule);
            } else {
                throw new InvalidEntryException(entry + " does not comply with either fact or rule syntax.");
            }
        });
        return(db);

    }

    this.parseRule = function(ruleStr) {
        return (this.rParser.parse(ruleStr));
    }

    this.parseFact = function(factStr){
        return (this.fParser.parse(factStr));
    }


    this.parseQuery = function(queryStr) {
        return(this.qParser.parse(queryStr));
    }


    this.isValidFact = function(line){
        return (this.fParser.isValidEntry(line));
    }

    this.isValidRule = function(line){
        return (this.rParser.isValidEntry(line));
    }

    this.isValidQuery = function(query){
        return (this.qParser.isValidEntry(query));
    }
};

module.exports = Parser;
