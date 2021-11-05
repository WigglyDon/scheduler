import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const interviewers = props.interviewers;
  const listInterviewers = interviewers.map((interviewer) => (
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={props.value === interviewer.id}
      setInterviewer={() => props.onChange(interviewer.id)}
    />
  ));
  return <ul className="interviewers__list">{listInterviewers}</ul>;
}
