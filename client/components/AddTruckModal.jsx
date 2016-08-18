import React, {Component} from 'react'



export default class TruckList extends Component {
  render(){
    return (
      <div>
      <div className="container">
        <h2 className='add-truck-title'>Add A Truck</h2>
      </div>
        <div className='row'>
        <form
            className="form-horizontal container"
            onChange={this.handleChange}
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
                    value="[CHANGE ME]"
                    />
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
              value=""
                    />
                </div>
              </div>
            
              <div className="form-group row">
                <div className="form-label">
                  <label className="control-label"><h4>What's the yelpID for this food truck?</h4></label>
                </div>

                <div className="col-xs-offset-1 col-xs-10">
                  <input
                className="form-control"
                type="text"
                placeholder="Yelp ID"
                name="yelpId"
                value="[CHANGE ME]"
                    />
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
                        name="sunday"
                        placeholder="e.g. 2nd and Mission"
                        value="[CHANGE ME]"
                      />
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
                        name="sunday"
                        placeholder="e.g. 2nd and Mission"
                        value="[CHANGE ME]"
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
                        name="sunday"
                        placeholder="e.g. 2nd and Mission"
                        value="[CHANGE ME]"
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
                        name="sunday"
                        placeholder="e.g. 2nd and Mission"
                        value="[CHANGE ME]"
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
                        name="sunday"
                        placeholder="e.g. 2nd and Mission"
                        value="[CHANGE ME]"
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
                        name="sunday"
                        placeholder="e.g. 2nd and Mission"
                        value="[CHANGE ME]"
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
                        value="[CHANGE ME]"
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
