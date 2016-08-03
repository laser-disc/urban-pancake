import { expect } from 'chai';
import geocoder from "../../client/utils/utils"

describe('Geocoding function', function(){
  it('should exist', function(){
    expect(geocoder).to.not.equal(undefined)
  })
  it('should return an array of length two', function(){
    // console.log(geocoder())
    expect(geocoder()).to.have.length(2)
  })
  it('should return lat/long coordinates near San Francisco', function(){
    expect(geocoder()[0]).to.be.a("number")
    expect(geocoder()[1]).to.be.a("number")
    expect(geocoder()[0]).be.within(37.5, 38)
    expect(geocoder()[1]).be.within(-122.6,-122)
  })
  xit('should return null if not given a string', function(){
    expect(geocoder("foo")[0]).to.equal(null)
  })
  xit('should make a request to the server API', function(){

  })
})








