import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { expect } from 'chai';
import { PASS_NEW_TRUCK, PassNewTruck } from '../../client/actions/PassNewTruck';

describe('PassNewTruck action creator', () => {
  it('should return an action with a type', () => {
    expect(PassNewTruck()).to.have.property('type');
  })
  it('should return an action with a payload', () => {
    let payload = PassNewTruck().payload;
    expect(payload).to.exist;
  })
});