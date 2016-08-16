import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { expect } from 'chai';
import { FETCH_EVENTS } from '../../client/actions/FetchEvents';
import reducer from '../../client/reducers/reducer_EventsList';

describe('Reducer_EventsList', () => {
  let state, action;
  beforeEach(() => {
    state = ['dummy state'];
    action = {
      type: FETCH_EVENTS,
      payload: {
        data: 'a'
      }
    };
  })
  it('should be a function', () => {
    expect(reducer).to.be.a('function');
  })
  it('should have a fetch events case', () => {
    expect(reducer([], action)).to.eql(['a']);
  })
  it('should return the current state by default', () => {
    expect(reducer(state, 'HELLO')).to.eql(['dummy state']);
  })
});
