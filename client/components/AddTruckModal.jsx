import React, {Component} from 'react'

export default class TruckList extends Component {
  render(){
    return (
      <div>
        <form
            className="add-truck"
            onChange={this.handleChange}
            >
            <div>
              <label>Name</label>
              <input
                type="text"
                placeholder="name"
                name="name"
                value="[CHANGE ME]"
                />
            </div>
            <div>
              <label>Twitter Handle</label>
              @<input
              type="text"
              placeholder="T. Handle"
              name="handle"
              value="[CHANGE ME]"
              />
            </div>
            <div>
              <label>Yelp ID</label>
              <input
                type="text"
                placeholder="Yelp ID"
                name="yelpId"
                value="[CHANGE ME]"
                />
            </div>
            <div>
              <label>Locations</label>
              <ul>
                <li>
                  Sunday<input
                    type="text"
                    name="sunday"
                    placeholder="e.g. 2nd and Mission"
                    value="[CHANGE ME]"
                  />
                </li>
                <li>
                  Monday<input
                    type="text"
                    name="monday"
                    placeholder="e.g. 2nd and Mission"
                    value="[CHANGE ME]"
                  />
                </li>
                <li>
                  Tuesday<input
                    type="text"
                    name="tuesday"
                    placeholder="e.g. 2nd and Mission"
                    value="[CHANGE ME]"
                  />
                </li>
                <li>
                  Wednesday<input
                    type="text"
                    name="wednesday"
                    placeholder="e.g. 2nd and Mission"
                    value="[CHANGE ME]"
                  />
                </li>
                <li>
                  Thursday<input
                    type="text"
                    name="thursday"
                    placeholder="e.g. 2nd and Mission"
                    value="[CHANGE ME]"
                  />
                </li>
                <li>
                  Friday<input
                    type="text"
                    name="friday"
                    placeholder="e.g. 2nd and Mission"
                    value="[CHANGE ME]"
                  />
                </li>
                <li>
                  Saturday<input
                    type="text"
                    name="saturday"
                    placeholder="e.g. 2nd and Mission"
                    value="[CHANGE ME]"
                  />
                </li>
              </ul>
            </div>
            <button type="button" onClick={this.props.handleSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}
