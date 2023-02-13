import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {v4} from 'uuid'
import StudentAnswers from '../StudentAnswers'
import {zero} from '../questions'
import './index.css'

const masterQuestions = JSON.parse(localStorage.getItem('questions'))

const operators = [
  {
    id: v4(),
    operator: '+',
    displayOperator: 'Plus',
  },
  {
    id: v4(),
    operator: '/',
    displayOperator: 'Divided By',
  },
  {
    id: v4(),
    operator: '*',
    displayOperator: 'Multiply BY',
  },
  {
    id: v4(),
    operator: '-',
    displayOperator: 'Minus',
  },
]

class Master extends Component {
  state = {
    isStudentAnswers: false,
    firstNum: '',
    secondNum: '',
    operatorValue: operators[0].operator,
  }

  changeIsStudent = () =>
    this.setState(prevState => ({
      isStudentAnswers: !prevState.isStudentAnswers,
    }))

  logoutBtnClicked = () => {
    const {history} = this.props
    Cookies.remove('loginUser')
    history.replace('/login')
  }

  renderStudentListAnswers = () => {
    const {isStudentAnswers} = this.state
    console.log(isStudentAnswers)
    const userDetails = JSON.parse(localStorage.getItem('userDetails'))
    const studentDetails = userDetails.filter(
      eachItem => eachItem.category === 'STUDENT',
    )
    console.log(studentDetails)

    return (
      <>
        <h2>Displaying Student Answers</h2>
        <ul className="master-questions-list-container">
          <li className="activity-log-student">
            <p className="question">Question </p>
            <p className="answer">Answer </p>
            <p className="name">Student Name </p>
            <p className="student-answer">Student Answer</p>
            <p className="status">Status</p>
          </li>
          {studentDetails.map(eachItem => (
            <StudentAnswers
              key={eachItem.userId}
              name={eachItem.username}
              studentItems={eachItem.questions}
            />
          ))}
        </ul>
      </>
    )
  }

  onSubmitForm = () => {
    const {firstNum, secondNum, operatorValue} = this.state
    if (firstNum !== '' && secondNum !== '') {
      return null
    }
    return null
  }

  onChangeFirstNum = event => {
    if (event.target.value.length <= 1) {
      return this.setState({firstNum: event.target.value})
    }
    return null
  }

  onChangeSecondNum = event => {
    if (event.target.value.length <= 1) {
      return this.setState({secondNum: event.target.value})
    }
    return null
  }

  onChangeOperator = event => this.setState({operatorValue: event.target.value})

  renderNewQuestionByMaster = () => {
    const {operatorValue, firstNum, secondNum} = this.state
    return (
      <div>
        <form className="master-input-form-con" onSubmit={this.onSubmitForm}>
          <label htmlFor="firstNum">First Number</label>
          <input
            id="firstNum"
            type="number"
            placeholder="Enter Number"
            onChange={this.onChangeFirstNum}
            value={firstNum}
          />
          <label htmlFor="operator">Operator</label>

          <select
            id="operator"
            value={operatorValue}
            onChange={this.onChangeOperator}
          >
            {operators.map(eachItem => (
              <option key={eachItem.id} value={eachItem.operator}>
                {eachItem.displayOperator}
              </option>
            ))}
          </select>
          <label htmlFor="secondNum">Second Number</label>

          <input
            onChange={this.onChangeSecondNum}
            id="secondNum"
            type="number"
            placeholder="Enter Number"
            value={secondNum}
          />
          <button type="submit" className="submit-btn check-button">
            Submit
          </button>
          <p className="desc">Please Enter Single Positive Number</p>
        </form>
      </div>
    )
  }

  renderMasterListQuestions = () => {
    let count = 0
    return (
      <>
        <h2>Displaying List of Questions</h2>
        {this.renderNewQuestionByMaster()}
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
          {isStudentAnswers ? (
            <>{this.renderStudentListAnswers()}</>
          ) : (
            <> {this.renderMasterListQuestions()}</>
          )}
        </div>
      </div>
    )
  }
}

export default Master
