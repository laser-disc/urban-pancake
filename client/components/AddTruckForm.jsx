import React, {Component} from 'react';
import ErrorMsg from './ErrorMsg.jsx';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
import Button from 'muicss/lib/react/button';

export default class AddTruckForm extends Component {
  constructor(props) {
    super(props);
    // console.log('add truck form props', props);
  }
  render(){
    return (
<div className='container'>
  <Form onChange={this.props.handleChange}>
    <legend>Add A Food Truck</legend>

    <Input label="What's the name of the truck?" name="name" floatingLabel={true} required={true} value={this.props.truck.name}/>
    <ErrorMsg name="name" msg={this.props.err.name} />
    <Input label="Does the truck have a twitter handle?" name="handle" floatingLabel={true} required={true} value={this.props.truck.handle}/>
    <ErrorMsg name="name" msg={this.props.err.handle} />
    <Input label="What's the Yelp URL for this food truck?" name="yelpId" floatingLabel={true} required={true} value={this.props.truck.yelpId}/>
    <ErrorMsg name="name" msg={this.props.err.yelp} />
    <br/>
  <h4>Truck Schedule</h4>
  <p> Enter a location such as "2nd and Mission",  "SF MOMA" or "Dolores Park" </p>
<div className="form-schedule">
    <Input
    label="Monday"
    floatingLabel={true} 
    type="text"
    name="monday"
    placeholder="e.g. 2nd and Mission"
    value={this.props.days.monday}
    />
    <ErrorMsg name="loc" msg={this.props.err.loc} />
    
    <Input
    label="Tuesday"
    floatingLabel={true} 
    type="text"
    name="tuesday"
    placeholder="e.g. 2nd and Mission"
    value={this.props.days.tuesday}
    />
  
    <Input
    label="Wednesday"
    floatingLabel={true} 
    type="text"
    name="wednesday"
    placeholder="e.g. 2nd and Mission"
    value={this.props.days.wednesday}
    />
   
    <Input
    label="Thursday"
    floatingLabel={true} 
    type="text"
    name="thursday"
    placeholder="e.g. 2nd and Mission"
    value={this.props.days.thursday}
    />
   
    <Input
    label="Friday"
    floatingLabel={true} 
    type="text"
    name="friday"
    placeholder="e.g. 2nd and Mission"
    value={this.props.days.friday}
    />
   
    <Input
    label="Saturday"
    floatingLabel={true}
    type="text"
    name="saturday"
    placeholder="e.g. 2nd and Mission"
    value={this.props.days.saturday}
    />
   
    <Input
    label="Sunday"
    floatingLabel={true} 
    type="text"
    name="sunday"
    placeholder="e.g. 2nd and Mission"
    value={this.props.days.sunday}
    />
</div>

    <Button variant="raised" onClick={this.props.handleSubmit}>Submit</Button>
  </Form>
</div>
    );
  }
}