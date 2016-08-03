import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { expect } from 'chai';
import App from '../../client/components/app';
import Index from '../../client/index';

console.log(JSON.stringify(App));
describe('<App />', function() {
  it('should exist', function() {
    var wrapper = shallow(<App />);
    expect(wrapper).to.exist;
  })
})
