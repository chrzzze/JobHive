import users from '../services/users.js'
import './sign-in.css'
import Navbar from '../components/navbar'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import logo from '../assets/jobhive logo.png'
import axios from 'axios'

const Login = () => {

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const handleEmail = (event) => setEmail(event.target.value)
  const handlePassword = (event) => setPassword(event.target.value)

  const navigate = useNavigate()

  const login = async (event) => {
    event.preventDefault()
    try { 

      setErrorMessage('')

      console.log(`i'm going to log the fuck in using ${email} and ${password}`)

      const response = await users.login(email, password)

      if (response && response.token) {
        console.log("YOU LOGGED IN HOLY SHIT")
        
        localStorage.setItem('token', response.token)
        localStorage.setItem('user', JSON.stringify(response.user)) //save current identity and token kinemerut

        axios.defaults.headers.common['Authorization'] = `Bearer ${response.token}` //automatically include token in http requests

        //add dashboards here
        if(response.user.userType === 'Student') {
          navigate('/students/home/')
        }
      } 

    } catch (error) {
      console.log('You fucked up: ', error)
      console.log(error)
      setErrorMessage('Incorrect username or password.')

    }
  }

  const [ errorMessage, setErrorMessage ] = useState('')


  return (
    <div id="login-container">

      <Navbar />


      {/* <!-- Sign In Section --> */}
      <section className="auth-section">
        {/* <!-- Left: Sign-in card --> */}
        <div className="auth-card">
          <div className="website-logo">
            <Link to="/"><img src={logo} alt="JobHive Logo" /></Link>
          </div>

          <h1 className="auth-title">Welcome to JobHive</h1>
          <p className="auth-subtitle">Sign in to continue your career journey</p>

          <form className="auth-form" onSubmit={login}>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="form-group">
              <input type="email" id="email" placeholder="Email address" value={email} onChange={handleEmail} required />
            </div>

            <div className="form-group">
              <input type="password" id="password" placeholder="Password" value={password} onChange={handlePassword} required />
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" id="remember" />
                <span>Remember me</span>
              </label>
              <a href="resetpass.html" className="forgot-link">Forgot password?</a>
            </div>

            <button type="submit" className="btn-submit">Sign in</button>

            <p className="create-text">
              New to JobHive? <Link to="/signup">Create an account</Link>
            </p>
          </form>
        </div>

        {/* <!-- Right: Info section --> */}
        <div className="info-section">
          <div className="platform-tag">
            <img src={logo} alt="JobHive Logo" />
            <span>JobHive Platform</span>
          </div>

          <h1>Find Your Dream Job Today</h1>
          <p>Connect with thousands of employers and discover opportunities that match your skills and aspirations.</p>
        </div>
      </section>
    </div>

  )
}

export default Login