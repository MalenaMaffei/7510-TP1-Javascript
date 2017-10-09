var Query = require('../src/query');

var QueryParser = function() {
    this.NAMEPOS = 1;
    this.VALUEPOS = 2;
    this.syntax = /^([a-z\-]+)\(([a-z\-]+(, [a-z\-]+){0,})\)$/i

    this.parse = function(queryStr) {
        if (this.isValidEntry(queryStr)){
            var matches = this.getMatches(queryStr, this.syntax);
            var name = this.getName(matches);
            var values = this.getValues(matches);
            var query = new Query(name, values);
            return (query);
        }
        throw new InvalidEntryException(queryStr + " does not comply with query syntax.");
    }

    this.getMatches = function(entry){
        return (entry.match(this.syntax));
    }

    this.isValidEntry = function(entry){
        return (this.getMatches(entry, this.syntax) !== null);
    }

    this.getName = function(matches){
        return (matches[this.NAMEPOS]);
    }

    this.getValues = function(matches){
        return (matches[this.VALUEPOS].split(', '));
    }
}

module.exports = QueryParser;
