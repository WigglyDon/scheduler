import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {

  const liClass = classNames("interviewers__item", {
   
    "interviewers__item--selected": props.selected,
  });


  let liValue = '';
  if (props.selected) {
    liValue = props.name;
  }

  return (

    <li className={liClass} onClick={props.setInterviewer}>
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
    {liValue}
  </li>
  );



}