import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import App from '../../client/components/app';

describe('<TweetList />', function() {
  it('should exist', function() {
    const wrapper = shallow(<TweetList />);
    expect(wrapper).to.exist;
  })
})
