var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Parser = require('../src/parser');
var Fact = require('../src/fact');
var Rule = require('../src/rule');
var Database = require('../src/database');
var Query = require('../src/query');

describe("Parser", function() {

    var parser = null;
    var db = null;
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

    var factDb = [
        "varon(juan).",
        "padre(juan, pepe)."
    ];

    var ruleDb = [
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
            assert(parser.fParser.isValidEntry(validFact));
        });

        it('valid fact should be true', function() {
            var validFact = "varon(juan, pedro, roberto).";
            assert(parser.fParser.isValidEntry(validFact));
        });

        it('invalid fact should be false', function() {
            var invalidFact = "varon(juan)";
            assert(!parser.fParser.isValidEntry(invalidFact));
        });

        it('invalid fact should be false', function() {
            var invalidFact = "varon(juan,).";
            assert(!parser.fParser.isValidEntry(invalidFact));
        });

        it('invalid fact should be false', function() {
            var invalidFact = "varon(juan,pepe).";
            assert(!parser.fParser.isValidEntry(invalidFact));
        });

        it('invalid fact should be false', function() {
            var invalidFact = "varon(juan, pepe pedro).";
            assert(!parser.fParser.isValidEntry(invalidFact));
        });
    });

    describe('Rules validity', function() {

        it('valid rule should be true', function() {
            var validRule = "padre(X, Y) :- hijo(Y, X), varon(X).";
            assert(parser.rParser.isValidEntry(validRule));
        });

        it('valid rule should be true', function() {
            var validRule = "padre(X, Y, Z) :- hijo(Y, X), varon(X), hijo(Z, X).";
            assert(parser.rParser.isValidEntry(validRule));
        });

        it('invalid fact should be false', function() {
            var validRule = "padre(X, Y) :- hijo(Y, X),varon(X).";
            assert(!parser.rParser.isValidEntry(validRule));
        });

        it('invalid fact should be false', function() {
            var validRule = "padre(X, Y) :- hijo(Y, X), varon(X)";
            assert(!parser.rParser.isValidEntry(validRule));
        });

        it('invalid fact should be false', function() {
            var validRule = "padre(X, Y):-hijo(Y, X), varon(X).";
            assert(!parser.rParser.isValidEntry(validRule));
        });

        it('invalid fact should be false', function() {
            var validRule = "padre(X, Y) :- hijo(), varon(X).";
            assert(!parser.rParser.isValidEntry(validRule));
        });
    });

    describe('Database parsing', function() {

        it('parsing correct db should NOT raise exception', function() {
            expect(parser.parseDatabase.bind(parser, correctDb)).to.not.throw();
        });

        it('parsing incorrect db should raise exception', function() {
            expect(parser.parseDatabase.bind(parser, incorrectDb)).to.throw();
        });

        it('fact db includes known fact should be true', function() {
            var fact = new Fact('varon', ['juan']);
            db = parser.parseDatabase(factDb);
            assert(db.factExists(fact));
        });

        it('fact db includes known fact should be true', function() {
            var fact = new Fact('padre', ['juan', 'pepe']);
            db = parser.parseDatabase(factDb);
            assert(db.factExists(fact));
        });

        it('fact db includes unknown fact should be false', function() {
            var fact = new Fact('madre', ['juan', 'pepe']);
            db = parser.parseDatabase(factDb);
            assert(!db.factExists(fact));
        });

        it('ruleDb includes unknown rule should be false', function() {
            var ruleStr = "hola(X, Y) :- mujer(X), padre(Y, X).";
            var rule = parser.rParser.parse(ruleStr);
            db = parser.parseDatabase(ruleDb);
            assert(!db.ruleExists(rule));
        });

        it('ruleDb includes known rule should be true', function() {
            var ruleStr = "hija(X, Y) :- mujer(X), padre(Y, X).";
            var rule = parser.rParser.parse(ruleStr);
            db = parser.parseDatabase(ruleDb);
            assert(db.ruleExists(rule));
        });

    });

    describe('Rule parsing', function() {

        it('parsed rule should equal its str parameters', function() {
            var ruleStr = "hija(X, Y) :- mujer(X), padre(Y, X).";
            var factA = parser.fParser.parse('mujer(X).');
            var factB = parser.fParser.parse('padre(Y, X).');
            var rule = parser.rParser.parse(ruleStr);
            var name = rule.name == "hija";
            var values = rule.values[0] == "X" && rule.values[1] == "Y";
            var facts = rule.facts[0].equals(factA) && rule.facts[1].equals(factB);
            assert(name && values && facts);
        });
    });

    describe('Query parsing', function() {

        it('parsed query should equal its str parameters', function() {
            var queryStr = "hija(mama, hija)";
            var query = parser.qParser.parse(queryStr);
            var name = query.name == "hija";
            var values = query.values[0] == "mama" && query.values[1] == "hija";
            assert(name && values);
        });
    });
});
