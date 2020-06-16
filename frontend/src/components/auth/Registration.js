import React from 'react'
import { registerAUser } from '../../lib/api'
import Footer from '../common/Footer'
import { toast } from '../../lib/notifications'
import { Link } from 'react-router-dom'

class Registration extends React.Component {
  state = {
    newUser: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    },
    errors: {}
  }

  handleChange = e => {
    const newUser = { ...this.state.newUser, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ newUser, errors })
  }

  handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await registerAUser(this.state.newUser)
      console.log(res)
      this.props.history.push('/login')
      toast(res.data.message)
    } catch (err) {
      console.log(err.response)
      this.setState({ errors: err.response.data })
    }
  }


  render() {
    const { errors, newUser } = this.state
    return (
      <>
        <section className="form-sec">
          <div className="sign-ups">
            <form onSubmit={this.handleSubmit} >
              <p className="forms-name">Register:</p>
              <div className="login-fields">
                <label>Enter a Username</label>
                <div className="control">
                  <input
                    className={`input ${errors.username ? 'is-danger' : ''}`}
                    onChange={this.handleChange}
                    placeholder="Username"
                    name="username"
                    value={newUser.username}
                  />
                </div>
              </div>
              <div className="login-fields">
                <label>Enter your email</label>
                <div className="control">
                  <input
                    className={`input ${errors.email ? 'is-danger' : ''}`}
                    onChange={this.handleChange}
                    placeholder="Email"
                    name="email"
                    value={newUser.email}
                  />
                </div>
              </div>
              <div className="login-fields">
                <label>Enter your Password</label>
                <div className="control">
                  <input
                    className={`input ${errors.password ? 'is-danger' : ''}`}
                    onChange={this.handleChange}
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={newUser.password}
                  />
                </div>
              </div>
              <div className="login-fields">
                <label>Re-enter your Password</label>
                <div className="control">
                  <input
                    className={`input ${errors.passwordConfirmation ? 'is-danger' : ''}`}
                    onChange={this.handleChange}
                    type="password"
                    placeholder="Confirm Password"
                    name="passwordConfirmation"
                    value={newUser.passwordConfirmation}
                  />
                </div>
              </div>
              <button className="auth-button">Submit</button>
              <div className="auth-links">
                <Link to="/login"><p>Already have an account?</p></Link>
              </div>
            </form>
          </div>
        </section>
        <Footer />
      </>
    )
  }
}

export default Registration