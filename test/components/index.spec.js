import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import HelloWorld from '../../client/components/helloworld';

describe('<HelloWorld />', function() {
  it('should exist', function() {
    const wrapper = shallow(<HelloWorld/>);
    expect(wrapper).to.exist;
  })
})
