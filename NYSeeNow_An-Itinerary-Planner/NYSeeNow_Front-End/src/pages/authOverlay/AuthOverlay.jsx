import React, { useState } from 'react'
import { Login } from './Login'
import { Register } from './Register'
import { ResetPassword } from './Reset'
import styles from './AuthOverlay.module.css'
import { useNavigate } from 'react-router'

export const AuthOverlay = (props) => {
  const [currentForm, setCurrentForm] = useState('login')

  const toggleForm = (formName) => {
    setCurrentForm(formName)
  }

  const navigate = useNavigate()

  const overlayClose = () => {
    navigate(-1)
  }

  let overlayElement
  switch (currentForm) {
    case 'login':
      overlayElement = <Login onFormSwitch={toggleForm} />
      break
    case 'register':
      overlayElement = <Register onFormSwitch={toggleForm} />
      break
    case 'reset':
      overlayElement = <ResetPassword onFormSwitch={toggleForm} />
      break
    default:
      overlayElement = null
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.authOverlayCard}>{overlayElement}</div>
      <button onClick={overlayClose} className={styles.authCloseButton}>
        x Close
      </button>
    </div>
  )
}
