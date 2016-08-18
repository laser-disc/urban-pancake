import React, {Component} from 'react';

export default class AddTruckForm extends Component {
  constructor(props) {
    super(props);
    // console.log('add truck form props', props);
  }
  render(){
    return (
      <div>
        <form
            className="add-truck"
            onChange={this.props.handleChange}
            >
            <div>
              <label>Name</label>
              <input
                type="text"
                placeholder="name"
                name="name"
                value={this.props.truck.name}
                />
            </div>
            <div>
              <label>Twitter Handle</label>
              @<input
              type="text"
              placeholder="Thandle"
              name="handle"
              value={this.props.truck.handle}
              />
            </div>
            <div>
              <label>Yelp ID</label>
              <input
                type="text"
                placeholder="Yelp ID"
                name="yelpId"
                value={this.props.truck.yelpId}
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
                    value={this.props.days.sunday}
                  />
                </li>
                <li>
                  Monday<input
                    type="text"
                    name="monday"
                    placeholder="e.g. 2nd and Mission"
                    value={this.props.days.monday}
                  />
                </li>
                <li>
                  Tuesday<input
                    type="text"
                    name="tuesday"
                    placeholder="e.g. 2nd and Mission"
                    value={this.props.days.tuesday}
                  />
                </li>
                <li>
                  Wednesday<input
                    type="text"
                    name="wednesday"
                    placeholder="e.g. 2nd and Mission"
                    value={this.props.days.wednesday}
                  />
                </li>
                <li>
                  Thursday<input
                    type="text"
                    name="thursday"
                    placeholder="e.g. 2nd and Mission"
                    value={this.props.days.thursday}
                  />
                </li>
                <li>
                  Friday<input
                    type="text"
                    name="friday"
                    placeholder="e.g. 2nd and Mission"
                    value={this.props.days.friday}
                  />
                </li>
                <li>
                  Saturday<input
                    type="text"
                    name="saturday"
                    placeholder="e.g. 2nd and Mission"
                    value={this.props.days.saturday}
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
