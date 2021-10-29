import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {

  const liClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });

  formatSpots(props.spots);

  return (
   
    <li className={liClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );

    function formatSpots(spots) {
      let formattedSpots = `${spots} spots remaining`;
      if (spots === 1) {
        formattedSpots = "1 spot remaining";
      }
      if (spots === 0) {
        formattedSpots = "no spots remaining";
      }
      return formattedSpots;
    }

}