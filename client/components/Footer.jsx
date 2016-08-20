import React, {Component} from 'react'

export default class Footer extends Component {
  render(){
    return(
    <footer className="footer">
      <div className="container">
        <p>This site displays information for lunch time only</p>
        <p>An Urban Pancake App</p>
        <p><a href="https://github.com/urban-pancake/hunger-stop">Source Code on Github</a></p>
      </div>
    </footer>
    )
  }
}
