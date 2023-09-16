import React, { useState } from 'react'
import './Login.css'
import { post } from '../../net/net'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export const Register = (props) => {
  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')
  const [confirm, setConfirm] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth()

  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const NAME_REGEX = /^[a-zA-Z0-9._-]{4,20}$/
  const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,16}$/

  const validateForm = () => {
    let formErrors = {}

    if (!EMAIL_REGEX.test(email)) {
      formErrors.email = 'Invalid email address.'
    }
    if (username.trim().length < 4 || username.trim().length > 20 || !NAME_REGEX.test(username)) {
      formErrors.username =
        'The length should be between 4 to 20 characters long. ' +
        'May contain letters (either lowercase or uppercase), numbers, periods (.), underscores (_), and hyphens (-)'
    }
    if (pass.trim().length < 6 || pass.trim().length > 16 || !PASS_REGEX.test(pass)) {
      formErrors.password =
        'Password must be between 6 and 16 characters long. ' +
        'Password must contain at least one uppercase letter. ' +
        'Password must contain at least one lowercase letter. ' +
        'Password must contain at least one digit.'
    }
    if (pass !== confirm) {
      formErrors.confirm = 'Passwords do not match.'
    }

    setErrors(formErrors)

    return Object.keys(formErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const userData = {
      username: username,
      password: pass,
      email: email
    }

    post(
      '/api/auth/register',
      userData,
      (message, status) => {
        // Handle success
        setIsLoggedIn(true)
        setAuthUser(username)
        console.log('Registration successful:', message, status)
        setMessage('Registration successful')
      },
      (message, status) => {
        // Handle failure
        console.error('Registration error:', message, status)
        setMessage('Registration error: ' + message)
      }
    )
  }

  return (
    <div className="auth-form-container">
      <h2>Register</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="E-mail"
          id="email"
        />
        {errors.email && <p>{errors.email}</p>}
        <label htmlFor="username">Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
          id="username"
        />
        {errors.username && <p>{errors.username}</p>}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Password"
          id="password"
        />
        {errors.password && <p>{errors.password}</p>}
        <label htmlFor="confirm">Confirm Password</label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Confirm Password"
          id="confirm"
        />
        {errors.confirm && <p>{errors.confirm}</p>}
        <button>Create Account</button>
        {message && <p>{message}</p>}
      </form>
      <button onClick={() => props.onFormSwitch('login')}>
        Already have an account? Login here.
      </button>
    </div>
  )
}
