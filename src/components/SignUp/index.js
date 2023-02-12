import {Component} from 'react'
import {Link} from 'react-router-dom'

import {v4 as uuidv4} from 'uuid'

import './index.css'

const checkUserdetails = localStorage.getItem('userDetails')
if (checkUserdetails === null) {
  const userDetails = [
    {
      userId: uuidv4(),
      username: 'charan',
      category: 'MASTER',
      password: 'Charan123',
    },
    {
      userId: uuidv4(),
      username: 'hari',
      category: 'MASTER',
      password: 'Hari123',
    },
    {
      userId: uuidv4(),
      username: 'teja',
      category: 'STUDENT',
      password: 'teja123',
    },
  ]
  const userDetailsString = JSON.stringify(userDetails)
  localStorage.setItem('userDetails', userDetailsString)
}

const selectDetails = [
  {id: uuidv4(), category: 'MASTER', displayText: 'Master'},
  {id: uuidv4(), category: 'STUDENT', displayText: 'Student'},
]

class SignUp extends Component {
  state = {
    username: '',
    password: '',
    activeCategory: selectDetails[0].category,
    errorMsg: '',
  }

  onChangeUserName = event => this.setState({username: event.target.value})

  onChangePassword = event => this.setState({password: event.target.value})

  onChangeCategory = event =>
    this.setState({activeCategory: event.target.value})

  onSubmitSignUp = async event => {
    event.preventDefault()
    const {username, password, activeCategory} = this.state
    if (username === '' || password === '') {
      return this.setState({errorMsg: 'Please fill all the details'})
    }
    const parsedUserDetails = JSON.parse(
      await localStorage.getItem('userDetails'),
    )
    const checkUserName = parsedUserDetails.find(
      eachItem => eachItem.username.toLowerCase() === username.toLowerCase(),
    )
    if (checkUserName) {
      return this.setState({
        errorMsg: 'username already exists Please choose another Name',
      })
    }

    const newUsersList = [
      ...parsedUserDetails,
      {userId: uuidv4(), username, category: activeCategory, password},
    ]
    const stringifiedList = JSON.stringify(newUsersList)
    await localStorage.setItem('userDetails', stringifiedList)
    this.setState({username: '', password: '', errorMsg: ''})
    const {history} = this.props
    return history.push('/login')
  }

  render() {
    const {username, password, activeCategory, errorMsg} = this.state

    return (
      <div className="login-page-container">
        <form className="login-form-con" onSubmit={this.onSubmitSignUp}>
          <h1 className="login-form-heading">
            School<span>SignUp</span>
          </h1>
          <label htmlFor="userName">USERNAME</label>
          <input
            value={username}
            id="userName"
            type="text"
            placeholder="Enter the username"
            onChange={this.onChangeUserName}
          />
          <label htmlFor="select">CHOOSE CATEGORY</label>
          <select
            id="select"
            value={activeCategory}
            onChange={this.onChangeCategory}
          >
            {selectDetails.map(eachItem => (
              <option key={eachItem.id} value={eachItem.category}>
                {eachItem.displayText}
              </option>
            ))}
          </select>
          <label htmlFor="password">PASSWORD</label>
          <input
            onChange={this.onChangePassword}
            value={password}
            type="password"
            placeholder="Enter the Password"
          />

          <button className="login-form-button" type="submit">
            SignUp
          </button>
          {errorMsg !== '' && <p className="error-msg-signup">{errorMsg}</p>}
          <p className="sign-up-para">
            Already have an account Click here to <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    )
  }
}
export default SignUp
