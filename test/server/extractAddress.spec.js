const chai = require('chai');
const expect = chai.expect;
const extractAddress = require('../../server/extractAddress');

describe('extractAddress', function() {
  it('should be a function', function() {
    expect(typeof extractAddress).to.equal('function');
  });
  it('should return an object with loc and currentTweetIdx properties', function() {
    expect(['this is the first message!', 'lunch at 630 shell st from 11 to 1']).to.satisfy(function(string) {
      return {loc: "630 shell st", currentTweetIdx: 1}
    });
  });
});