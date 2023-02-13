import {Component} from 'react'

class StudentDetails extends Component {
  state = {answerValue: ''}

  submitAnswer = event => {
    event.preventDefault()
    const {onSubmitValue, studentDetails} = this.props
    const {id} = studentDetails

    const {answerValue} = this.state
    if (answerValue !== '') {
      onSubmitValue(id, answerValue)
    }
  }

  inputAnswer = event => this.setState({answerValue: event.target.value})

  render() {
    const {answerValue} = this.state
    const {count, studentDetails} = this.props

    const {displayText, isAnswered, studentAnswer} = studentDetails

    return (
      <li className="master-items-questions items">
        <p className="student-num">{count}</p>
        <p className="student-question">{displayText}</p>
        <p className="student-answer">
          {' '}
          {isAnswered ? 'Answered' : 'Not Answered'}
        </p>
        <form
          type="submit"
          onSubmit={this.submitAnswer}
          className="student-input"
        >
          {isAnswered ? (
            <p>{studentAnswer}</p>
          ) : (
            <input
              value={answerValue}
              onChange={this.inputAnswer}
              className="input-answer"
              type="number"
              placeholder="Enter Your Answer"
            />
          )}
        </form>
      </li>
    )
  }
}

export default StudentDetails
