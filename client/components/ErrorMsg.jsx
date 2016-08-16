import React from 'react';

//props: name of field, message to display

export default (props) => {
  return(
    <div>{props.name}, {props.msg}</div>
  )
}
