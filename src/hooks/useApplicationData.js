import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(initial) {
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
      [id]: appointment
    };

    const selectedDay = state.days.filter(day => day.name === state.day)[0];
    selectedDay.spots -= 1;
    const tempDays = [...state.days];
    tempDays[selectedDay.id - 1] = selectedDay;

    return axios
      .put(`/api/appointments/${appointment.id}`, appointment)
      .then(() => {
        setState({
          ...state,
          appointments,
          days: tempDays
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

    const selectedDay = state.days.filter(day => day.name === state.day)[0];
    selectedDay.spots += 1;
    const tempDays = [...state.days];
    tempDays[selectedDay.id - 1] = selectedDay;

    return axios.delete(`/api/appointments/${appointment.id}`).then(() =>
      setState({
        ...state,
        appointments,
        days: tempDays
      })
    );
  }

  const setDay = (day) => setState({ ...state, day });

  return { state, setDay, bookInterview, cancelInterview };
}
