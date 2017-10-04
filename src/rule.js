var Rule = function(name, values, rules) {
    this.name = name;
    this.values = values;
    this.rules = rules;

    this.equals = function(other) {
        return (this.name == other.name);
    }

}

module.exports = Rule;