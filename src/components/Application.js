import "components/Application.scss";
import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview,
} from "helpers/selectors";
import DayList from "./DayList";

import React from "react";
import useApplicationData from "../hooks/useApplicationData";

export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const listAppointments = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        getInterviewersForDay={getInterviewersForDay(state, state.day)}
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            spots={state.spots}
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {listAppointments}
        <Appointment bookInterview={bookInterview} time="5pm" />
      </section>
    </main>
  );
}
