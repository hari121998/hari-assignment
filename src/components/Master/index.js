import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {zero} from '../questions'
import './index.css'

const masterQuestions = JSON.parse(localStorage.getItem('questions'))

class Master extends Component {
  state = {isStudentAnswers: false}

  changeIsStudent = () =>
    this.setState(prevState => ({
      isStudentAnswers: !prevState.isStudentAnswers,
    }))

  logoutBtnClicked = () => {
    const {history} = this.props
    Cookies.remove('loginUser')
    history.replace('/login')
  }

  renderMasterListQuestions = () => {
    let count = 0
    return (
      <>
        <h2>Displaying List of Questions</h2>
        <ul className="master-questions-list-container">
          <li>
            <p className="count header-display">Sl.No</p>
            <p className="display-text header-display">Question</p>
            <p className="display-answer header-display">Answer</p>
          </li>
          {masterQuestions.map(eachItem => {
            count += 1
            return (
              <li key={eachItem.id} className="master-items-questions">
                <p className="count">{count}</p>
                <p className="display-text">{eachItem.displayText}</p>
                <p className="display-answer">{eachItem.displayAnswer}</p>
              </li>
            )
          })}
        </ul>
      </>
    )
  }

  checkMasterDetails = () => {
    const loginUser = Cookies.get('loginUser')
    const userDetails = JSON.parse(localStorage.getItem('userDetails'))
    const findCategory = userDetails.find(
      eachItem => eachItem.userId === loginUser,
    )

    return findCategory
  }

  render() {
    const {isStudentAnswers} = this.state

    const isMaster = this.checkMasterDetails()
    if (isMaster === undefined) {
      return <Redirect to="/login" />
    }
    if (isMaster.category === 'STUDENT') {
      return <Redirect to="/student" />
    }

    return (
      <div className="master-container">
        <nav className="master-nav-container">
          <h1>Masters View</h1>
          <button
            type="button"
            onClick={this.changeIsStudent}
            className="check-button"
          >
            {isStudentAnswers ? ' Check Questions' : ' Check Student Answers'}
          </button>
          <div className="nav-name-button-con">
            <span>{`Welcome ${isMaster.username}`}</span>
            <button type="button" onClick={this.logoutBtnClicked}>
              Logout
            </button>
          </div>
        </nav>
        <div className="list-container">
          {isStudentAnswers ? '' : <> {this.renderMasterListQuestions()}</>}
        </div>
      </div>
    )
  }
}

export default Master
