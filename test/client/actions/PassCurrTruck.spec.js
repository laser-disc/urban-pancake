import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { expect } from 'chai';
import { PASS_CURR_TRUCK, PassCurrTruck } from '../../client/actions/PassCurrTruck';

describe('PassCurrTruck action creator', () => {
  it('should return an action with a type', () => {
    expect(PassCurrTruck()).to.have.property('type');
  })
  it('should return an action with a payload', () => {
    let payload = PassCurrTruck().payload;
    expect(payload).to.exist;
  })
});