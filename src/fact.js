var Fact = function(name, values) {
    this.name = name;
    this.values = values;


    this.equals = function(other) {
        var equalNames = this.name == other.name;
        var equalValues = JSON.stringify(other.values) == JSON.stringify(this.values);
        return (equalNames && equalValues);
    }

}

module.exports = Fact;