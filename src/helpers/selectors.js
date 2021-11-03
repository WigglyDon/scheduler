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

export function getInterviewersForDay(state, day) {
  let interviewers = [];
  
  state.days.forEach((element) => {
    if (element.name === day) {
      element.interviewers.forEach((element) => {
        if (state.interviewers[element]) {
          interviewers.push(state.interviewers[element]);
        }
      });
    }
  });
  return interviewers;
}

export function getInterview(state, interview) {
  let newInterview = null;

  if (interview) {
    const interviewerID = interview.interviewer;
    newInterview = {
      student: interview.student,
      interviewer: state.interviewers[interviewerID],
    };
  }

  return newInterview;
}
