import "components/Application.scss";
import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview,
} from "helpers/selectors";
import DayList from "./DayList";

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: [],
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
      // axios.get("/api/debug/reset")
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .put(`/api/appointments/${appointment.id}`, appointment)
      .then(() => {
        console.log(appointments);
        setState({
          ...state,
          appointments,
        });
      });
  }

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`/api/appointments/${appointment.id}`).then(() =>
      setState({
        ...state,
        appointments,
      })
    );
  }

  const setDay = (day) => setState({ ...state, day });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const listAppointments = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    console.log("INTERVIEW", interview);
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
          <DayList days={state.days} value={state.day} onChange={setDay} />
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
