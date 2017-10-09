
var InvalidEntryException = require('./invalidEntryException');
var Database = require('../src/database');
var QueryParser = require('../src/queryParser');
var FactParser = require('../src/factParser');
var RuleParser = require('../src/ruleParser');


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

    this.parseQuery = function(queryStr) {
        return(this.qParser.parse(queryStr));
    }
};

module.exports = Parser;
