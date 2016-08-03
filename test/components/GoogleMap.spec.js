import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { expect } from 'chai';
import TestUtils from "react-addons-test-utils";
import {GoogleMapLoader, GoogleMap} from 'react-google-maps';
import GMap from '../../client/components/GoogleMap';

describe('<GMap />', () => {
  let fakeDefaultZoom;
  let fakeDefaultCenter;
  beforeEach(() => {
    fakeDefaultZoom = 12;
    fakeDefaultCenter = {
      lat: 37.7874707,
      lng: -122.4019886
    };
  });
	it('should exist', () => {
    const wrapper = shallow(<GMap defaultZoom={fakeDefaultZoom} defaultCenter={fakeDefaultCenter} />
);
    expect(wrapper).to.exist;
  });
});
