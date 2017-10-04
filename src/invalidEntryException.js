function InvalidEntryException(entry) {
    this.message = 'Invalid entry: ' + entry;
    this.name = 'InvalidEntryException';
    this.toString = function() {
        return this.message;
    };
};

module.exports = InvalidEntryException;