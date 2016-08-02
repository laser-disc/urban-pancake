import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import App from '../../client/components/app';

describe('<TruckList />', function() {
  it('should exist', function() {
    const wrapper = shallow(<TruckList />);
    expect(wrapper).to.exist;
  })
})
