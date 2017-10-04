var RuleValidator = require('./ruleValidator');
var FactValidator = require('./factValidator');
// var InvalidEntryException = require('./invalidEntryException');
// var Rule = require('./')

var Parser = function() {
    this.parseDatabase = function(database) {
        // returns Database object created from a list format database.
        var rules = [];
        var facts = [];
        database.map((entry, i) => {
            // throw new InvalidDatabaseException(entry);
        });

    };

    this.parseQuery = function(query) {

    };
};

module.exports = Parser;