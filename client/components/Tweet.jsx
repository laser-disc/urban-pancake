import React, {Component} from 'react';
// <div className='tweet test' dangerouslySetInnerHTML={createTweetMarkup()} />
export default class extends Component {
  
  render(){
    function createTweetMarkup() { 
      return {__html: this.props.html};
    }
    
    return (
      <div>
        <h6>At least you got a tweet</h6>
        
      </div>
      )
  }
}