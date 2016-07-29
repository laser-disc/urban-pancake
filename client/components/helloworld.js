import React from 'react';
import ReactDOM from 'react-dom';

class HelloWorld extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, George</h1>
      </div>
    )
  }
}
let renderTarget = document.getElementById('app');
console.log(renderTarget);
ReactDOM.render( <HelloWorld />, renderTarget );

export default HelloWorld;
