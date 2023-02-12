import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

class Master extends Component {
  checkMasterDetails = async () => {
    const loginUser = Cookies.get('loginUser')
    const userDetails = JSON.parse(await localStorage.getItem('userDetails'))
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
      <div>
        <h1>Hello</h1>
      </div>
    )
  }
}

export default Master
