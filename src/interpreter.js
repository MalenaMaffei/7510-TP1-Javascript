var Interpreter = function() {
    this.db = {};

    this.parseDB = function(params, paramss, paramsss) {

    }

    this.checkQuery = function(params) {
        return true;
    }

    // EL parseo lo hace el parser, va a llenar la db con rules or facts segun corresponda.
    // DEspues cada query tambien se la doy al parser que va a devolver una query.
    // Yo despues se la paso a la db. Si es factExist, true; else if ruleExist -> evaluate rule; else return false

    this.evaluateRule = function(query) {
        var rule = db.getRule(query);
    }

}

module.exports = Interpreter;