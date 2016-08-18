import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { expect } from 'chai';
import { FETCH_EVENTS, FetchEvents } from '../../client/actions/FetchEvents';

describe('FetchEvents action creator', () => {
  it('should return an action with a type', () => {
    expect(FetchEvents()).to.have.property('type');
  })
  it('should return an action with a payload', () => {
    let payload = FetchEvents().payload;
    expect(payload).to.exist;
  })
});
