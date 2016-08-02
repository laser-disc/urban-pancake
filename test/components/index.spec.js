import React from 'react';
import { mount, shallow, render } from 'enzyme';
import { expect } from 'chai';
import Index from '../../client/index';
import App from '../../client/components/app'

describe('<Index />', function() {
  it('should exist', function() {
    const wrapper = shallow(<Index />);
    expect(wrapper).to.exist;
  })
  it('should render App', () => {
    const wrapper = mount(<Index />);
    expect(wrapper.find(App)).to.exist;
  })
})
