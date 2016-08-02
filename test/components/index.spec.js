import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import Index from '../../client/index';
import App from '../../client/components/app'

describe('<Index />', function() {
  it('should exist', function() {
    const wrapper = shallow(<Index />);
    expect(wrapper).to.exist;
  })
  it('should have App', function() {
    const wrapper = shallow('<App />');
    expect(wrapper).to.exist;
  })
  it('should have TruckList', function() {
    const wrapper = shallow('<TruckList />');
    expect(wrapper).to.exist;
  })
})
