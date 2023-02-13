import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const masterQuestions = JSON.parse(localStorage.getItem('questions'))

class Student extends Component {
  componentDidMount = () => {
    this.addStudentsQuestions()
  }

  addStudentsQuestions = () => {}

  renderMasterListQuestions = () => {
    let count = 0
    return (
      <>
        <h2>Displaying Students Questions</h2>
        <ul className="master-questions-list-container">
          <li>
            <p className="student-num header-display">Sl.No</p>
            <p className="student-question header-display">Question</p>
            <p className="student-answer header-display">Student Answer</p>
            <p className="student-input header-display">
              Please Enter Your Answer
            </p>
          </li>
          {masterQuestions.map(eachItem => {
            count += 1
            return (
              <li key={eachItem.id} className="master-items-questions items">
                <p className="student-num">{count}</p>
                <p className="student-question">{eachItem.displayText}</p>
                <p className="student-answer"> Answered</p>
                <input
                  className="student-input input-answer"
                  type="number"
                  placeholder="Enter Your Answer"
                />
              </li>
            )
          })}
        </ul>
      </>
    )
  }

  logoutBtnClicked = () => {
    const {history} = this.props
    Cookies.remove('loginUser')
    history.replace('/login')
  }

  checkStudentDetails = () => {
    const loginUser = Cookies.get('loginUser')
    const userDetails = JSON.parse(localStorage.getItem('userDetails'))
    const findCategory = userDetails.find(
      eachItem => eachItem.userId === loginUser,
    )

    return findCategory
  }

  render() {
    const isStudent = this.checkStudentDetails()
    if (isStudent === undefined) {
      return <Redirect to="/login" />
    }
    if (isStudent.category === 'MASTER') {
      return <Redirect to="/master" />
    }

    return (
      <div className="master-container">
        <nav className="master-nav-container">
          <h1>Students View</h1>
          <div className="nav-name-button-con">
            <span>{`Welcome ${isStudent.username}`}</span>
            <button type="button" onClick={this.logoutBtnClicked}>
              Logout
            </button>
          </div>
        </nav>
        <div className="list-container">{this.renderMasterListQuestions()}</div>
      </div>
    )
  }
}

export default Student
