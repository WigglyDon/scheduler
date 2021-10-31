export function getAppointmentsForDay(state, day) {
  let appointments = [];

  state.days.forEach((element) => {
    if (element.name === day) {
      element.appointments.forEach((element) => {
        if (state.appointments[element]) {
          appointments.push(state.appointments[element]);
        }
      });
    }
  });
  return appointments;
}

export function getInterview(state, interview) {
  let newInterview = null;

  if (interview) {
    console.log("INTERVIEW", interview);
    newInterview = {
      student: "Lydia Millasder-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
    };
  }

  return newInterview;
}
