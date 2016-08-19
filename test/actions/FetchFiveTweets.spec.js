import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { expect } from 'chai';
import { FETCH_FIVE_TWEETS, FetchFiveTweets } from '../../client/actions/FetchFiveTweets';

describe('FetchFiveTweets action creator', () => {
  it('should return an action with a type', () => {
    expect(FetchFiveTweets()).to.have.property('type');
  })
  it('should return an action with a payload', () => {
    let payload = FetchFiveTweets().payload;
    expect(payload).to.exist;
  })
});