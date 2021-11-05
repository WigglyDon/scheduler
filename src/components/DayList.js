import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const days = props.days;
  const listDays = days.map((day) => (
    <DayListItem
      key={`day-list-item${day.id}`}
      name={day.name}
      spots={day.spots}
      selected={props.value === day.name}
      setDay={props.onChange}
    />
  ));

  return <ul>{listDays}</ul>;
}
