import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { logOut, isLoggedOn } from '../../lib/auths'

class Nav extends React.Component {

  logOutUser = () => {
    logOut()
    this.props.history.push('/tracks')
  }

  render() {
    return (
      <nav className="navbar">
        <div className="nav-con">
          <div className="navbar-brand">
            <Link to="/" id="one" className="main-navbar-items">Home</Link>
            <Link to="/tracks" id="two" className="main-navbar-items">Our Picks</Link>
            {isLoggedOn() && <Link to="/tracks/add-a-track" id="three" className="main-navbar-items">Add a banger!</Link>}
            {!isLoggedOn() && <Link to="/register" id="three" className="main-navbar-items">Sign Up </Link>}
            {isLoggedOn() && <Link to="/playlist/tracks" id="four" className="main-navbar-items">Your Playlist</Link>}
          </div>
        </div>
        <div className="nav-con">
          <div className="navbar-brand">
            {!isLoggedOn() && <Link to="/login" id="five" className="navbar-logins">Login</Link>}
            {isLoggedOn() && <span onClick={this.logOutUser} id="five" className="navbar-logins">Log Out</span>}
          </div>
        </div>
      </nav >
    )
  }
}



export default withRouter(Nav)