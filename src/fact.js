var Fact = function(name, values) {
    this.name = name;
    this.values = values;

    this.equals = function(fact) {
        var equalNames = this.name == fact.name;
        var equalValues = JSON.stringify(fact.values) == JSON.stringify(this.values);
        return (equalNames && equalValues);
    }

}

module.exports = Fact;