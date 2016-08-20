import React, {Component} from 'react';
import ErrorMsg from './ErrorMsg.jsx';

export default class AddTruckForm extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div>
        <div className="container">
          <h2 className='add-truck-title'>Add A Truck</h2>
        </div>
        <div className='row'>
            <form
              className="form-horizontal container"
              onChange={this.props.handleChange}
            >
              <div className="form-group row">
                <div className="form-label">
                  <label className="control-label"><h4>What's the name of the food truck?</h4></label>
                </div>
                <div className="col-xs-offset-1 col-xs-10">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="name"
                    name="name"
                    value={this.props.truck.name}
                  />
                  <ErrorMsg name="name" msg={this.props.err.name} />
                </div>
              </div>

              <div className="form-group row">
                <div className="form-label">
                  <label className="control-label"><h4>Does the truck have a twitter handle?</h4></label>
                </div>
                <div className="col-xs-offset-1 col-xs-10">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="@mobile_munchies"
                    name="handle"
                    value={this.props.truck.handle}
                  />
                <ErrorMsg name="handle" msg={this.props.err.handle} />
                </div>
              </div>

              <div className="form-group row">
                <div className="form-label">
                  <label className="control-label"><h4>What's the Yelp URL for this food truck?</h4></label>
                </div>

                <div className="col-xs-offset-1 col-xs-10">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Yelp ID"
                    name="yelpId"
                    value={this.props.truck.yelpId}
                  />
                <ErrorMsg name="yelp" msg={this.props.err.yelp} />
                </div>
              </div>
            <div className="form-group row">
              <div className="form-label">
                <label className="control-label"><h4>Where can we find this truck?</h4></label>
              </div>

             <div className="col-xs-offset-1 col-xs-10">
               <div className="weekday">
                  <h4>Monday</h4>
               </div>
                <div className="weekday-input col-xs-9 col-xs-9">
                  <input
                    className="form-control"
                    type="text"
                    name="monday"
                    placeholder="e.g. 2nd and Mission"
                    value={this.props.days.monday}
                  />
                <ErrorMsg name="loc" msg={this.props.err.loc} />
                </div>
              </div>
              <div className="col-xs-offset-1 col-xs-10">
                <div className="weekday">
                  <h4>Tuesday</h4>
                </div>
                <div className="weekday-input col-xs-9">
                  <input
                  className="form-control"
                    type="text"
                    name="tuesday"
                    placeholder="e.g. 2nd and Mission"
                    value={this.props.days.tuesday}
                  />
                </div>
              </div>
              <div className="col-xs-offset-1 col-xs-10">
                <div className="weekday">
                  <h4>Wednesday</h4>
                </div>
                <div className="weekday-input col-xs-9">
                  <input
                    className="form-control"
                    type="text"
                    name="wednesday"
                    placeholder="e.g. 2nd and Mission"
                    value={this.props.days.wednesday}
                  />
                </div>
              </div>
              <div className="col-xs-offset-1 col-xs-10">
                <div className="weekday">
                  <h4>Thursday</h4>
                </div>
                <div className="weekday-input col-xs-9">
                  <input
                  className="form-control"
                    type="text"
                    name="thursday"
                    placeholder="e.g. 2nd and Mission"
                    value={this.props.days.thursday}
                  />
                </div>
              </div>
              <div className="col-xs-offset-1 col-xs-10">
               <div className="weekday">
                  <h4>Friday</h4>
               </div>
                <div className="weekday-input col-xs-9">
                  <input
                    className="form-control"
                    type="text"
                    name="friday"
                    placeholder="e.g. 2nd and Mission"
                    value={this.props.days.friday}
                  />
                </div>
              </div>
              <div className="col-xs-offset-1 col-xs-10">
                <div className="weekday">
                  <h4>Saturday</h4>
                </div>
                <div className="weekday-input col-xs-9">
                  <input
                    className="form-control"
                    type="text"
                    name="saturday"
                    placeholder="e.g. 2nd and Mission"
                    value={this.props.days.saturday}
                  />
                </div>
              </div>
              <div className="col-xs-offset-1 col-xs-10">
                <div className="weekday">
                  <h4>Sunday</h4>
                </div>
                <div className="weekday-input col-xs-9">
                  <input
                    className="form-control"
                    type="text"
                    name="sunday"
                    placeholder="e.g. 2nd and Mission"
                    value={this.props.days.sunday}
                  />
                </div>
              </div>
            </div>
            <button type="button" onClick={this.props.handleSubmit}>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}
