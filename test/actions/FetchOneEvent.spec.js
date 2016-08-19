import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { expect } from 'chai';
import { FETCH_ONE_EVENT, FetchOneEvent } from '../../client/actions/FetchOneEvent';

describe('FetchOneEvent action creator', () => {
  it('should return an action with a type', () => {
    expect(FetchOneEvent()).to.have.property('type');
  })
  it('should return an action with a payload', () => {
    let payload = FetchOneEvent().payload;
    expect(payload).to.exist;
  })
});