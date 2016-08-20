import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { expect } from 'chai';
import { UPDATE_SEARCH_TERM, updateSearchTerm } from '../../client/actions/UpdateSearchTerm';

describe('UpdateSearchTerm action creator', () => {
  it('should return an action with a type', () => {
    expect(updateSearchTerm()).to.have.property('type');
  })
  it('should return an action with a payload', () => {
    let payload = updateSearchTerm().payload;
    expect(payload).to.exist;
  })
});