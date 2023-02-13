import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Master from './components/Master'
import Student from './components/Student'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={SignUp} />
    <Route exact path="/master" component={Master} />
    <Route exact path="/student" component={Student} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
