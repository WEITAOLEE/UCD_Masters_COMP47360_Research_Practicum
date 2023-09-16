import React, { useState } from 'react'
import './Login.css'
import { post } from '../../net/net'

export const ResetPassword = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [message, setMessage] = useState('')
    const [errors, setErrors] = useState({})


    const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const NAME_REGEX = /^[a-zA-Z0-9._-]{4,20}$/;
    const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,16}$/

    const validateForm = () => {
        let formErrors = {}

        if(!EMAIL_REGEX.test(email)) {
            formErrors.email = "Invalid email address."
        }
        if(username.trim().length < 4 || username.trim().length > 20 || !NAME_REGEX.test(username)) {
            formErrors.username = "The length should be between 4 to 20 characters long. " +
                "May contain letters (either lowercase or uppercase), numbers, periods (.), underscores (_), and hyphens (-)"
        }
        if(password.trim().length < 6 || password.trim().length > 16 || !PASS_REGEX.test(password)) {
            formErrors.password = "Password must be between 6 and 16 characters long. " +
                "Password must contain at least one uppercase letter. " +
                "Password must contain at least one lowercase letter. " +
                "Password must contain at least one digit."
        }
        if(password !== confirm) {
            formErrors.confirm = "Passwords do not match."
        }

        setErrors(formErrors)

        return Object.keys(formErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!validateForm()) {
            return
        }

        const userData = {
            email: email,
            newUsername: username,
            newPassword: password
        }

        post(
            '/api/auth/reset',
            userData,
            (message, status) => {
                // Handle success
                setMessage('Credentials reset successfully')
            },
            (message, status) => {
                // Handle failure
                setMessage('Failed to reset credentials')
            }
        )
    }

    return (
        <div className="auth-form-container">
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
                <label htmlFor="username">New Username</label>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder="New Username"
                    id="username"
                />
                {errors.username && <p>{errors.username}</p>}
                <label htmlFor="password">New Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New Password"
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
                <button type="submit">Reset</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    )
}
