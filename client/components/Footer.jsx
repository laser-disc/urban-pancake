import React, {Component} from 'react'

export default class Footer extends Component {
  render(){
    return(
    <footer className="footer">
      <div className="container">
        <p>This site displays information for lunch time only
        <span style={{float: "right"}}>An Urban Pancake App -
          <a href="https://github.com/urban-pancake/hunger-stop"> Source Code on Github</a></span></p>
      </div>
    </footer>
    )
  }
}
