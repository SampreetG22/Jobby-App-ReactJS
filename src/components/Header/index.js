import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Header = props => {
  const {history} = props
  const logout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-content nav-bar-large-container">
          <Link to="/" className="linkCSS">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>

          <ul className="nav-menu">
            <Link to="/" className="linksCSS">
              <li className="nav-menu-item">Home</li>
            </Link>

            <Link to="/jobs" className="linksCSS">
              <li className="nav-menu-item">Jobs</li>
            </Link>
          </ul>
          <li style={{listStyleType: 'none'}}>
            <button type="button" className="logout" onClick={logout}>
              Logout
            </button>
          </li>
        </div>
      </div>
    </nav>
  )
}
export default withRouter(Header)
