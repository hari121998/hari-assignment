import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Student extends Component {
  logoutBtnClicked = () => {
    const {history} = this.props
    Cookies.remove('loginUser')
    history.replace('/login')
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
    const isStudent = this.checkMasterDetails()
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
      </div>
    )
  }
}

export default Student
