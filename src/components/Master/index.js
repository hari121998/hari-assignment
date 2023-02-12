import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Master extends Component {
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
          <div className="nav-name-button-con">
            <span>{`Welcome ${isMaster.username}`}</span>
            <button type="button" onClick={this.logoutBtnClicked}>
              Logout
            </button>
          </div>
        </nav>
      </div>
    )
  }
}

export default Master
