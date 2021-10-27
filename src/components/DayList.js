import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const days = props.days;
  const listDays = days.map((day) => 
    <DayListItem selected={props.day === day.name} key={`day-list-item${day.id}`} name={day.name} spots={day.spots} setDay={props.setDay}/>
  );

  return (
   <ul>
{listDays}

   </ul>
   
  );

}