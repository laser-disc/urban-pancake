var React = require('react');
var ReactDOM = require('react-dom');

console.log("HELLO!!!")
var HelloWorld  = React.createClass({
  render: function(){
    return(
      <div> 
        <h1>Our First React Component :)</h1>
      </div>  
    )
  }
})

ReactDOM.render(
  <HelloWorld/>,
  document.getElementById('app')
)