var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Fact = require('../src/fact');


describe("Interpreter", function() {

    var fact = null;

    before(function() {
        // runs before all tests in this block
    });

    after(function() {
        // runs after all tests in this block
    });

    beforeEach(function() {
        // runs before each test in this block
        factA = new Fact('varon', ['pepe']);
        factB = new Fact('hijo', ['pepe', 'juan']);
    });

    afterEach(function() {
        // runs after each test in this block
    });


    describe('Fact equality', function() {

        it('same fact names and values should be true', function() {
            var other = new Fact('varon', ['pepe']);
            assert(factA.equals(other));
        });

        it('different fact names should be false', function() {
            var other = new Fact('hola', ['pepe']);
            assert(!factA.equals(other));
        });

        it('different fact values should be false', function() {
            var other = new Fact('varon', ['jacunto']);
            assert(!factA.equals(other));
        });

        it('same fact names and values should be true', function() {
            var other = new Fact('hijo', ['pepe', 'juan']);
            assert(factB.equals(other));
        });

        it('different fact values should be false', function() {
            var other = new Fact('hijo', ['a', 'b']);
            assert(!factB.equals(other));
        });

        it('different order fact values should be false', function() {
            var other = new Fact('hijo', ['juan', 'pepe']);
            assert(!factB.equals(other));
        });
    });
});