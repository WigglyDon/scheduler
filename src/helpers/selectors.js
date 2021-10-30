export default function getAppointmentsForDay(state, day) {
  let appointments = []

  state.days.forEach(element => {
  if (element.name === day) {
    element.appointments.forEach(element => {
      if (state.appointments[element]) {
        appointments.push(state.appointments[element])
      }
    })
  }
});
  return appointments;
}
