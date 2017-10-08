var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Parser = require('../src/parser');
// var Fact = require('../src/fact');
// var Rule = require('../src/rule');
// var Database = require('../src/database');
// var Query = require('../src/query');

describe("Parser", function() {

    var parser = null;
    // var db = null;
    // var factA = null;
    // var factB = null;
    // var rule = null;
    before(function() {
        // runs before all tests in this block
    });

    after(function() {
        // runs after all tests in this block
    });

    beforeEach(function() {
        // runs before each test in this block
        // factA = new Fact('varon', ['pepe']);
        // factB = new Fact('hijo', ['juan', 'pepe']);
        // rule = new Rule('padre', ['x', 'y'], [new Fact('varon', ['x']), new Fact('hijo', ['y', 'x'])]);
        // db = new Database();
        // db.addFact(factA);
        // db.addFact(factB);
        // db.addRule(rule);
        parser = new Parser();
    });

    afterEach(function() {
        // runs after each test in this block
    });


    describe('Facts validity', function() {

        it('valid fact should be true', function() {
            var validFact = "varon(juan).";
            assert(parser.isValidFact(validFact));
        });

        it('valid fact should be true', function() {
            var validFact = "varon(juan, pedro, roberto).";
            assert(parser.isValidFact(validFact));
        });

        it('invalid fact should be false', function() {
            var invalidFact = "varon(juan)";
            assert(!parser.isValidFact(invalidFact));
        });

        it('invalid fact should be false', function() {
            var invalidFact = "varon(juan,).";
            assert(!parser.isValidFact(invalidFact));
        });

        it('invalid fact should be false', function() {
            var invalidFact = "varon(juan,pepe).";
            assert(!parser.isValidFact(invalidFact));
        });

        it('invalid fact should be false', function() {
            var invalidFact = "varon(juan, pepe pedro).";
            assert(!parser.isValidFact(invalidFact));
        });
    });

    describe('Rules validity', function() {

        it('valid rule should be true', function() {
            var validRule = "padre(X, Y) :- hijo(Y, X), varon(X).";
            assert(parser.isValidRule(validRule));
        });

        it('invalid fact should be false', function() {
            var validRule = "padre(X, Y) :- hijo(Y, X),varon(X).";
            assert(!parser.isValidRule(validRule));
        });

        it('invalid fact should be false', function() {
            var validRule = "padre(X, Y) :- hijo(Y, X), varon(X)";
            assert(!parser.isValidRule(validRule));
        });

        it('invalid fact should be false', function() {
            var validRule = "padre(X, Y):-hijo(Y, X), varon(X).";
            assert(!parser.isValidRule(validRule));
        });

        it('invalid fact should be false', function() {
            var validRule = "padre(X, Y) :- hijo(), varon(X).";
            assert(!parser.isValidRule(validRule));
        });
    });
});
