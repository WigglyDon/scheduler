import React from "react";
import "components/Appointment/styles.scss";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Error from "components/Appointment/Error";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const ERROR = "ERROR";
  const CREATEERROR = "CREATEERROR";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(() => transition(CREATEERROR))
  }

  function unsave() {
    transition(CONFIRM);
  }

  function permaDelete(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props.cancelInterview(props.id, interview)
    .then(() => transition(EMPTY))
    .catch(() => transition(ERROR))
  }

  function edit() {
    transition(EDIT)
  }

  return (
    <div className="appointment">
      <header>{props.time}</header>
      {mode === ERROR && <Error onClose={() => transition(SHOW)}/>}
      {mode === CREATEERROR && <Error onClose={() => transition(EMPTY)}/>}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === DELETE && <Status message={"Deleting!"} />}
      {mode === EDIT && <Form
      student={props.interview.student}
      studentName={props.interview.student}
      onSave={save}
      interviewers={props.getInterviewersForDay}
      onCancel={back}
      interviewer={props.interview.interviewer.id}
       />}
      {mode === CONFIRM && (
        <Confirm
          message={"Really delete?"}
          onCancel={back}
          onConfirm={permaDelete}
        />
      )}
      {mode === SAVING && <Status message={"Please wait!"} />}
      {mode === CREATE && (
        <Form
          onSave={save}
          interviewers={props.getInterviewersForDay}
          onCancel={back}
        />
      )}
      {mode === SHOW && props.interview && (
        <Show
          id={props.id}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={unsave}
          onEdit={edit}
        />
      )}
    </div>
  );
}
