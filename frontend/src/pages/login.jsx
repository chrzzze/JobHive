
import './login.css'
import Navbar from '../components/navbar'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmail = (event) => setEmail(event.target.value)
  const handlePassword = (event) => setPassword(event.target.value)

  const navigate = useNavigate()

  const login = async (event) => {
    event.preventDefault()
    try {

      setErrorMessage('')

      console.log(`i'm going to log the fuck in using ${email} and ${password}`)

      const response = await axios.post('http://localhost:3001/login', {email, password})

      if (response.status === 200) {
        console.log("YOU LOGGED IN HOLY SHIT")
        navigate('/success')
      }

    } catch (error) {
      console.log('You fucked up: ', error)
      console.log(error)
      setErrorMessage('Incorrect username or password.')
    }
  }

  const [errorMessage, setErrorMessage] = useState('')
  

  return (
    <div id="login-container">
 
      <Navbar />

      {/* <!-- Sign In Section  --> */}
      <section className="auth-section">
        <div className="auth-container">
          <div className="auth-card">
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in your account to continue</p>

            <form className="auth-form" onSubmit={login}>

              {errorMessage && <h2 className="form-options">{errorMessage}</h2>}
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" placeholder="Enter your email" value={email} onChange={handleEmail} required />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter your password" value={password} onChange={handlePassword} required />
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" id="remember" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="forgot-link">Forgot password?</a>
              </div>

              <button type="submit" className="btn-submit">Sign In</button>
            </form>

            <div className="auth-footer">
              <p>Don't have an account? <a href="sign-up.html" className="auth-link">Create Account</a></p>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Footer  --> */}
      <footer className="footer">
        <p>&copy; 2025 JobHive. eya cuti.</p>
      </footer>
    </div>

  )
}

export default Login