import {Component} from 'react'
import {v4 as uniqueId} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
    appointmentsList: [],
  }

  onFilter = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()

    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: uniqueId(),
      title: titleInput,
      date: formattedDate,
      isStared: false,
    }
    this.setState(preState => ({
      appointmentsList: [...preState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  toggleStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachApp => {
        if (id === eachApp.id) {
          return {...eachApp, isStared: !eachApp.isStared}
        }
        return eachApp
      }),
    }))
  }

  getFilteredAppointmentList = () => {
    const {appointmentsList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentsList.filter(each => each.isStared === true)
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentList = this.getFilteredAppointmentList()
    return (
      <div className="app-container">
        <div className="appointment-card">
          <div className="appointment-container">
            <div>
              <h1 className="appointment-heading">Add Appointment</h1>

              <form className="form-container" onSubmit={this.onAddAppointment}>
                <div className="inputs-con">
                  <label htmlFor="title" className="inputs-names">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="inputs"
                    placeholder="TITLE"
                    onChange={this.onChangeTitle}
                    value={titleInput}
                  />
                </div>

                <div className="inputs-con">
                  <label htmlFor="date" className="inputs-names">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    className="inputs"
                    onChange={this.onChangeDate}
                    value={dateInput}
                  />
                </div>

                <button className="add-btn" type="submit">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointments-img"
            />
          </div>

          <hr className="hr-line" />

          <div className="appointments-container">
            <div className="appointments-con1">
              <h1 className="appointments-heading">Appointments</h1>
              <button
                className={`filter-style ${filterClassName}`}
                type="button"
                onClick={this.onFilter}
              >
                Starred
              </button>
            </div>
            <ul className="appointment-list-con">
              {filteredAppointmentList.map(eachApp => (
                <AppointmentItem
                  key={eachApp.id}
                  AppointmentsDetails={eachApp}
                  toggleStar={this.toggleStar}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
