import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { expect } from 'chai';
import { FETCH_YELP, FetchYelp } from '../../client/actions/FetchYelp';

describe('FetchYelp action creator', () => {
  it('should return an action with a type', () => {
    expect(FetchYelp()).to.have.property('type');
  })
  it('should return an action with a payload', () => {
    let payload = FetchYelp().payload;
    expect(payload).to.exist;
  })
});