import React from 'react'
import "components/Appointment/styles.scss";
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"

export default function Appointment(props) {
  function isShowing (props) {
    return (props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty />);
  }
  return (
    <div className="appointment">
      <header>{props.time}</header>
     {isShowing(props)}
    </div> 
  );


}