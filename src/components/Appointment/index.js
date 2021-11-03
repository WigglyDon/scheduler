import React from "react";
import "components/Appointment/styles.scss";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {

    const interview = {
      student: name,
      interviewer
    };
    
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
  
  }

  function unsave() {
    transition(CONFIRM)
  }

  function permaDelete(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.cancelInterview(props.id, interview)
    .then(() => transition(EMPTY))
  }



  

  console.log("props", props, "mode", mode);
  return (
    <div className="appointment">
      <header>{props.time}</header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE) } />}
      {mode === DELETE && <Status message={"Deleting!"} />}
      {mode === CONFIRM && <Confirm message={"Really delete?"} onCancel= {back} onConfirm={permaDelete}/>}
      {mode === SAVING && <Status message={"Please wait!"} />}
      {mode === CREATE && <Form onSave={save}  interviewers= {props.getInterviewersForDay} onCancel= {back}/>}
      {mode === SHOW && props.interview && (
        <Show
          id={props.id}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={unsave}
        />
      )}
    </div>
  );
}
