import './index.css'

const StudentAnswers = props => {
  const {studentItems, name} = props
  console.log(studentItems)

  return (
    <>
      {studentItems.map(eachItem => (
        <li className="student-answers-list" key={eachItem.id}>
          <p className="question">{eachItem.displayText}</p>
          <p className="answer">{eachItem.displayAnswer}</p>
          <p className="name">{name}</p>
          <p className="student-answer">
            {eachItem.isAnswered ? eachItem.studentAnswer : 'Not Answered'}
          </p>
          {eachItem.isAnswered ? (
            <p
              className={`status ${
                eachItem.displayAnswer.toString() === eachItem.studentAnswer
                  ? 'green-color'
                  : 'red-color'
              }`}
            >
              {eachItem.displayAnswer.toString() === eachItem.studentAnswer
                ? 'Right Answer'
                : 'Wrong Answer'}
            </p>
          ) : (
            <p className="status not-answered">Not Answered</p>
          )}
        </li>
      ))}
    </>
  )
}

export default StudentAnswers
