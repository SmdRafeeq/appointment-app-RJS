import './index.css'

const AppointmentItem = props => {
  const {AppointmentsDetails, toggleStar} = props
  const {title, date, id, isStared} = AppointmentsDetails

  const starImgUrl = isStared
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggleStar(id)
  }

  return (
    <li className="appointment-item-con">
      <div className="appointment-details">
        <p className="appointment-title">{title}</p>

        <button
          type="button"
          className="star-btn"
          data-testId="star"
          onClick={onClickStar}
        >
          <img src={starImgUrl} alt="star" className="star-image" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
