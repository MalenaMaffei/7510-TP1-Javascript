var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Rule = require('../src/rule');
var Fact = require('../src/fact');
var Query = require('../src/query');

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
            var query = new Query('padre', ['x', 'y']);
            assert(rule.equals(query));
        });

        it('different rule names should be false', function() {
            var query = new Query('aaa', ['x', 'y']);
            assert(!rule.equals(query));
        });

        it('different rule values but same name should be true', function() {
            var query = new Query('padre', ['x']);
            assert(rule.equals(query));
        });
    });
});