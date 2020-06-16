import React from 'react'
import { loginUser } from '../../lib/api'
import { setToken } from '../../lib/auths'
import Footer from '../common/Footer'
import { toast } from '../../lib/notifications'
import { Link } from 'react-router-dom'

class Login extends React.Component {
  state = {
    login: {
      email: '',
      password: ''
    },
    error: ''
  }

  handleChange = e => {
    const login = { ...this.state.login, [e.target.name]: e.target.value }
    this.setState({ login, error: '' })
  }

  handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await loginUser(this.state.login)
      setToken(res.data.token)
      toast(res.data.message)
      this.props.history.push('/tracks')
    } catch (err) {
      this.setState({ error: 'Invalid Input' })
    }
  }

  render() {
    const { login, error } = this.state
    return (
      <>
        <section className="hero is-fullheight-with-navbar">
          <div className="sign-ups">
            <form onSubmit={this.handleSubmit}>
              <p className="forms-name">Login:</p>
              <div className="login-fields">
                <label>Enter your Email</label>
                <input
                  className={`input ${error ? 'is-danger' : ''}`}
                  placeholder="Email"
                  onChange={this.handleChange}
                  name="email"
                  value={login.email}
                />
              </div>
              {error && <small className="help is-danger">{error}</small>}
              <div className="login-fields">
                <label>Enter your Password</label>
                <input
                  className={`input ${error ? 'is-danger' : ''}`}
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                  value={login.password}
                />
              </div>
              <button className="auth-button">Submit</button>
              <div className="auth-links">
                <Link to="/register"><p>Not signed up yet?</p></Link>
              </div>
            </form>
          </div>
        </section>
        <Footer />
      </>
    )
  }
}

export default Login