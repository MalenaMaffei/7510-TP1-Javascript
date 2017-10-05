var Query = require('../src/query');

var Fact = function(name, values) {
    Query.call(this, name, values);


    this.equals = function(other) {
        var equalNames = this.name == other.name;
        var equalValues = JSON.stringify(other.values) == JSON.stringify(this.values);
        return (equalNames && equalValues);
    }

}

module.exports = Fact;