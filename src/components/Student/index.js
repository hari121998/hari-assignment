import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
import StudentDetails from '../StudentDetails'

const checkStudentDetails = () => {
  const loginUser = Cookies.get('loginUser')
  const userDetails = JSON.parse(localStorage.getItem('userDetails'))
  const findCategory = userDetails.find(
    eachItem => eachItem.userId === loginUser,
  )

  return findCategory
}

class Student extends Component {
  state = {studentData: {...checkStudentDetails()}, inputAnswerValue: ''}

  onSubmitInputValue = (id, value) => {
    const {studentData} = this.state
    const {questions} = studentData
    const updateData = questions.map(question => {
      if (question.id === id) {
        return {...question, studentAnswer: value, isAnswered: true}
      }
      return question
    })
    const userDetails = JSON.parse(localStorage.getItem('userDetails'))
    // console.log(updateData)
    const newUserDetails = userDetails.map(eachItem => {
      if (eachItem.userId === studentData.userId) {
        return {...eachItem, questions: [...updateData]}
      }
      return {...eachItem}
    })
    // console.log(newUserDetails)
    localStorage.setItem('userDetails', JSON.stringify(newUserDetails))
    this.setState({studentData: {...studentData, questions: updateData}})
  }

  renderMasterListQuestions = () => {
    const {studentData, inputAnswerValue} = this.state

    const {questions} = studentData

    let count = 0
    return (
      <>
        <h2>Displaying Students Questions</h2>
        <ul className="master-questions-list-container">
          <li>
            <p className="student-num header-display">Sl.No</p>
            <p className="student-question header-display">Question</p>
            <p className="student-answer header-display">
              Student Answer Status
            </p>
            <p className="student-input header-display">
              Please Enter Your Answer
            </p>
          </li>
          {questions.map(eachItem => {
            count += 1
            return (
              <StudentDetails
                key={eachItem.id}
                onSubmitValue={this.onSubmitInputValue}
                inputAnswerValue={inputAnswerValue}
                count={count}
                studentDetails={eachItem}
              />
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

  render() {
    const {studentData} = this.state
    if (studentData.length === 0) {
      return <h1>NO Data Found</h1>
    }
    const isStudent = checkStudentDetails()
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
