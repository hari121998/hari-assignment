import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <>
    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
      />
      <h1>Page Not Found</h1>
      <p>{`we're sorry, the page you requested could not be found`}</p>
      <Link to="/login">
        <button className="login-form-button" type="button">
          Login to Continue
        </button>
      </Link>
    </div>
  </>
)
export default NotFound
