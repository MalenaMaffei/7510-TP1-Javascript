var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Fact = require('../src/fact');
var Rule = require('../src/rule');
var Database = require('../src/database');

describe("Database", function() {

    var db = null;

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
        rule = new Rule('padre', ['x', 'y'], [factA, factB]);
        db = new Database();
        db.addFact(factA);
        db.addFact(factB);
        db.addRule(rule);
    });

    afterEach(function() {
        // runs after each test in this block
    });


    describe('Facts existence', function() {

        it('existing fact should be true', function() {
            var other = new Fact('varon', ['pepe']);
            assert(db.factExists(other));
        });

        it('wrong fact should be false', function() {
            var other = new Fact('varon', ['pepa']);
            assert(!db.factExists(other));
        });

        it('nonexisting fact should be false', function() {
            var other = new Fact('mujer', ['pepa']);
            assert(!db.factExists(other));
        });
    });

    describe('Rules existence', function() {

        it('existing rule should be true', function() {
            var other = new Rule('padre', ['x', 'y'], [factA, factB]);
            assert(db.ruleExists(other));
        });

        it('different rule with same name should be true', function() {
            var other = new Rule('padre', ['a', 'b'], [factB, factA]);
            assert(db.ruleExists(other));
        });

        it('nonexisting rule should be false', function() {
            var other = new Rule('madre', ['pepa'], [factA, factB]);
            assert(!db.ruleExists(other));
        });
    });

    describe('Rules and Facts Addition', function() {

        it('adding duplicate fact should raise exception', function() {
            expect(db.addFact.bind(db, factA)).to.throw();
        });

        it('adding duplicate rule should raise exception', function() {
            expect(db.addRule.bind(db, rule)).to.throw();
        });

        it('different rule with same name should raise exception', function() {
            var other = new Rule('padre', ['a', 'b'], [factB, factA]);
            expect(db.addRule.bind(db, other)).to.throw();
        });

        it('adding new fact should NOT raise exception', function() {
            var other = new Fact('varon', ['pepa']);
            expect(db.addFact.bind(db, other)).to.not.throw();
        });

        it('adding new rule should NOT raise exception', function() {
            var other = new Rule('madre', ['pepa'], [factA, factB]);
            expect(db.addRule.bind(db, other)).to.not.throw();
        });
    });
});