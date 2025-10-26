import './login.css'

const Login = () => {
  return (
    <div id="login-container">
       <nav className="navbar">
    <div className="nav-container">
      <div className="logo"><a href="index.html" style="text-decoration: none; color: inherit;">JobHive</a></div>
      
      <ul className="nav-links">
        <li><a href="index.html#about">About</a></li>
        <li><a href="index.html#features">Features</a></li>
        <li><a href="index.html#contact">Contact Us</a></li>
        <li><a href="sign-in.html" className="btn btn-signin">Sign In</a></li>
        <li><a href="sign-up.html" class="btn btn-signup">Create Account</a></li>
      </ul>
    </div>
  </nav>

   {/* <!-- Sign In Section  --> */}
  <section className="auth-section">
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Sign in your account to continue</p>
        
        <form className="auth-form" action="ih.html">
          <div className="form-group">
            <label for="email">Email Address</label>
            <input type="email" id="email" placeholder="Enter your email" required />
          </div>
          
          <div className="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" required />
          </div>
          
          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" id="remember" />
              <span>Remember me</span>
            </label>
            <a href="#" className="forgot-link">Forgot password?</a>
          </div>
          
          <button href type="submit" className="btn-submit">Sign In</button>
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