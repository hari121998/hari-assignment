import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import './index.css'

const selectDetails = [
  {id: uuidv4(), category: 'MASTER', displayText: 'Master'},
  {id: uuidv4(), category: 'STUDENT', displayText: 'Student'},
]

class Login extends Component {
  state = {
    username: '',
    password: '',
    activeCategory: selectDetails[0].category,
    errorMsg: '',
  }

  onChangeUserName = event => this.setState({username: event.target.value})

  onChangePassword = event => this.setState({password: event.target.value})

  onChangeCategory = async event =>
    this.setState({activeCategory: event.target.value})

  onSubmitLogin = async event => {
    event.preventDefault()
    const {username, password, activeCategory} = this.state
    if (username === '' || password === '') {
      return this.setState({errorMsg: 'Please fill all the details'})
    }

    const userDetails = JSON.parse(await localStorage.getItem('userDetails'))
    const checkUserName = userDetails.find(
      eachItem => eachItem.username === username,
    )
    const checkPassword = userDetails.find(
      eachItem =>
        eachItem.password === password && eachItem.username === username,
    )
    const checkCategory = userDetails.find(
      eachItem =>
        eachItem.category === activeCategory && eachItem.username === username,
    )

    if (checkUserName === undefined) {
      return this.setState({errorMsg: 'Please Enter Valid Username'})
    }
    if (checkPassword === undefined) {
      return this.setState({errorMsg: 'Please Enter Valid Password'})
    }
    if (checkCategory === undefined) {
      return this.setState({errorMsg: 'Please Check With Login Type'})
    }
    const {history} = this.props
    this.setState({username: '', errorMsg: '', password: ''})
    Cookies.set('loginUser', checkUserName.userId, {expires: 1})
    if (activeCategory === selectDetails[0].category) {
      return history.replace('/master')
    }
    return history.replace('/student')
  }

  render() {
    const {username, password, activeCategory, errorMsg} = this.state
    return (
      <div className="login-page-container">
        <form className="login-form-con" onSubmit={this.onSubmitLogin}>
          <h1 className="login-form-heading">
            School<span>Login</span>
          </h1>
          <label htmlFor="userName">USERNAME</label>
          <input
            value={username}
            id="userName"
            type="text"
            placeholder="Enter the username"
            onChange={this.onChangeUserName}
          />
          <label htmlFor="select">CHOOSE LOGIN TYPE</label>
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
            Login
          </button>
          {errorMsg !== '' && <p className="error-msg-signup">{errorMsg}</p>}

          <p className="sign-up-para">
            Dont have an account Click here to <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    )
  }
}
export default Login
