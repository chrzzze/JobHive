
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import users from '../services/users.js'
import './sign-up.css'
import Navbar from '../components/navbar'
import logo from '../assets/jobhive logo.png'

const Signup = () => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const [userType, setUserType] = useState('student')
  const [educationLevel, setEducationLevel] = useState('shs')

  // Form data
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    // student fields
    student_number: '',
    course_enrolled: '',
    // company fields
    company_name: '',
    brn: '',
    industry: '',
    website: '',
    location: '',
    contact_no: '',
    // admin fields
    admin_position: '',
    department: '',
  })

  // Course mapping by education level
  const coursesByLevel = {
    shs: [
      'ITMAWD',
      'ABM',
      'HUMSS',
      'GAS',
      'TOPER'
    ],
    college: [
      'Information Technology',
      'Business Administration',
      'Hospitality Management',
      'Tourism'
    ]
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value)
    setErrorMessage('')
    // reset form on type change
    setFormData({
      first_name: '',
      middle_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
      student_number: '',
      course_enrolled: '',
      company_name: '',
      brn: '',
      industry: '',
      website: '',
      location: '',
      contact_no: '',
      admin_position: '',
      department: '',
    })
  }

  const handleEducationLevelChange = (e) => {
    setEducationLevel(e.target.value)
    setFormData(prev => ({ ...prev, course_enrolled: '' })) // reset course when level changes
  }

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setErrorMessage('Email and password are required')
      return false
    }
    if (formData.password !== formData.confirm_password) {
      setErrorMessage('Passwords do not match')
      return false
    }
    if (userType === 'student' && !formData.student_number) {
      setErrorMessage('Student number is required')
      return false
    }
    if (userType === 'company' && !formData.company_name) {
      setErrorMessage('Company name is required')
      return false
    }
    return true
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (!validateForm()) return

    try {
      let response
      if (userType === 'student') {
        response = await users.signupStudent(
          formData.first_name,
          formData.middle_name,
          formData.last_name,
          formData.email,
          formData.password,
          formData.student_number,
          formData.course_enrolled
        )
      } else if (userType === 'company') {
        response = await users.signupCompany(
          formData.company_name,
          formData.email,
          formData.password,
          formData.brn,
          formData.industry,
          formData.website,
          formData.location,
          formData.contact_no
        )
      } else if (userType === 'admin') {
        response = await users.signupAdmin(
          formData.first_name,
          formData.middle_name,
          formData.last_name,
          formData.email,
          formData.password,
          formData.admin_position,
          formData.department,
          formData.contact_no
        )
      }

      if (response && response.message) {
        console.log('Signup successful:', response.message)
        navigate('/login')
      }
    } catch (error) {
      console.error('Signup error:', error)
      setErrorMessage(error.response?.data?.message || 'Signup failed. Please try again.')
    }
  }

  return (
    <div id="signup-container">
      <Navbar />
      <section className="auth-section">
        <div className="auth-card">
          <div className="website-logo">
            <Link to="/"><img src={logo} alt="JobHive Logo" /></Link>
          </div>

          <h1 className="auth-title">Join JobHive</h1>
          <p className="auth-subtitle">Create your account to get started</p>

          <form className="auth-form" onSubmit={handleSignup}>
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            {/* User Type Selection */}
            <div className="form-group">
              <label>Account Type</label>
              <select value={userType} onChange={handleUserTypeChange} required>
                <option value="student">Student</option>
                <option value="company">Company</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Student Fields */}
            {userType === 'student' && (
              <>
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    placeholder="First name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Middle Name</label>
                  <input
                    type="text"
                    name="middle_name"
                    placeholder="Middle name (optional)"
                    value={formData.middle_name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Last name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Education Level</label>
                  <select value={educationLevel} onChange={handleEducationLevelChange} required>
                    <option value="shs">Senior High School (SHS)</option>
                    <option value="college">College</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Course</label>
                  <select name="course_enrolled" value={formData.course_enrolled} onChange={handleInputChange} required>
                    <option value="">Select a course</option>
                    {coursesByLevel[educationLevel].map(course => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Student Number</label>
                  <input
                    type="text"
                    name="student_number"
                    placeholder="Student number"
                    value={formData.student_number}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </>
            )}

            {/* Company Fields */}
            {userType === 'company' && (
              <>
                <div className="form-group">
                  <label>Company Name</label>
                  <input
                    type="text"
                    name="company_name"
                    placeholder="Company name"
                    value={formData.company_name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Business Registration Number (BRN)</label>
                  <input
                    type="text"
                    name="brn"
                    placeholder="BRN"
                    value={formData.brn}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Industry</label>
                  <input
                    type="text"
                    name="industry"
                    placeholder="Industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Website</label>
                  <input
                    type="url"
                    name="website"
                    placeholder="Website URL"
                    value={formData.website}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Contact Number</label>
                  <input
                    type="tel"
                    name="contact_no"
                    placeholder="Contact number"
                    value={formData.contact_no}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </>
            )}

            {/* Admin Fields */}
            {userType === 'admin' && (
              <>
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    placeholder="First name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Middle Name</label>
                  <input
                    type="text"
                    name="middle_name"
                    placeholder="Middle name (optional)"
                    value={formData.middle_name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Last name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Admin Position</label>
                  <input
                    type="text"
                    name="admin_position"
                    placeholder="Admin position"
                    value={formData.admin_position}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Department</label>
                  <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Contact Number</label>
                  <input
                    type="tel"
                    name="contact_no"
                    placeholder="Contact number"
                    value={formData.contact_no}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </>
            )}

            {/* Common Fields */}
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirm_password"
                placeholder="Confirm password"
                value={formData.confirm_password}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit" className="btn-submit">Create Account</button>

            <p className="create-text">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </form>
        </div>

        <div className="info-section">
          <div className="platform-tag">
            <img src={logo} alt="JobHive Logo" />
            <span>JobHive Platform</span>
          </div>

          <h1>Start Your Journey</h1>
          <p>Whether you're a student seeking opportunities or a company looking for talent, JobHive connects you with the right people.</p>
        </div>
      </section>
    </div>
  )
}

export default Signup