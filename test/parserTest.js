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
    var correctDb = [
        "varon(juan).",
        "varon(pepe).",
        "varon(hector).",
        "varon(roberto).",
        "varon(alejandro).",
        "mujer(maria).",
        "mujer(cecilia).",
        "padre(juan, pepe).",
        "padre(juan, pepa).",
        "padre(hector, maria).",
        "padre(roberto, alejandro).",
        "padre(roberto, cecilia).",
        "hijo(X, Y) :- varon(X), padre(Y, X).",
        "hija(X, Y) :- mujer(X), padre(Y, X)."
    ];

    var incorrectDb = [
        "varon(juan).",
        "varon(pepe).",
        "varon(hector).",
        "varon(roberto).",
        "varon().",
        "mujer(maria).",
        "mujer(cecilia).",
        "padre(juan, pepe).",
        "padre(juan, pepa).",
        "padre(hector, maria).",
        "padre(roberto, alejandro).",
        "padre(roberto,.",
        "hijo(X, Y) :- varon(X), padre(Y, X).",
        "hija(X, Y) :- mujer(X), padre(Y, X)."
    ];
    before(function() {
        // runs before all tests in this block
    });

    after(function() {
        // runs after all tests in this block
    });

    beforeEach(function() {
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

    describe('Database parsing', function() {

        it('parsing correct db should NOT raise exception', function() {
            expect(parser.parseDatabase.bind(parser, correctDb)).to.not.throw();
        });

        it('parsing incorrect db should raise exception', function() {
            expect(parser.parseDatabase.bind(parser, incorrectDb)).to.throw();
        });
    });
});
