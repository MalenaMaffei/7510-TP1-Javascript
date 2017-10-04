var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Rule = require('../src/rule');
var Fact = require('../src/fact');

describe("Rule", function() {

    var rule = null;

    before(function() {
        // runs before all tests in this block
    });

    after(function() {
        // runs after all tests in this block
    });

    beforeEach(function() {
        // runs before each test in this block
        factA = new Fact('varon', ['x']);
        factB = new Fact('hijo', ['x', 'y']);
        rule = new Rule('padre', ['x', 'y'], [factA, factB]);
    });

    afterEach(function() {
        // runs after each test in this block
    });


    describe('rule equality', function() {

        it('same rule should be true', function() {
            var other = new Rule('padre', ['x', 'y'], [factA, factB]);
            assert(rule.equals(other));
        });

        it('different rule names should be false', function() {
            var other = new Rule('aaa', ['x', 'y'], [factA, factB]);
            assert(!rule.equals(other));
        });

        it('different rule values but same name should be true', function() {
            var other = new Rule('padre', ['x'], [factA]);
            assert(rule.equals(other));
        });
    });
});