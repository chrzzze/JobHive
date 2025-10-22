import { useState } from 'react'
import './App.css'

const Navbutton = ({ link, text }) => {
  return (
    <li><a href={link} className="ye">{text}</a></li>
  )
}

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">JobHive</div>
        <ul className="nav-links">
          <Navbutton link="#about" text="About" />
          <Navbutton link="#features" text="Features" />
          <Navbutton link="#contact" text="Contact Us" />
          <li><a href="#signin" className="btn btn-signin">Sign In</a></li>
          <li><a href="#create" className="btn btn-signup">Create Account</a></li>
        </ul>
      </div>
    </nav>
  )
}
const SectionTitle = ({ text }) => {
  return (
    <h2 className="section-title">{text}</h2>
  )
}

const ContactForm = () => {
  return (
    <form className="contact-form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" placeholder="Your Name" required />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Your Email" required />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea id="message" placeholder="Your Message" required></textarea>
      </div>
      <button type="submit" className="btn-submit">Send Message</button>
    </form>
  )
}

const App = () => {


  return (
    <>
      <Navbar />

      {/* <!-- landing page --> */}

      <section className="frontpage">
        <div className="frontpage-content">
          <h1>Unlock Your Full
            <br />Career Potential With
            <br />JobHive</h1>
          <p>Bringing Students and Companies together. Find. Apply. Succed!</p>
          <a href="#create" className="btn-cta">Get Started</a>
        </div>
      </section>


      {/* <!-- About sec  --> */}
      <section id="about" className="about">
        <h2 className="section-title">About Us</h2>
        <div className="about-content">
          <p>JobHive is a platform created to simplify the on-the-job
            training process for students and companies. It helps students
            find the perfect internship by bringing opportunities and
            companies in one place.
            We created this website to make the OJT process easier. more
            accessible. and more meaningful by bridging the gap between
            students. and industry partners.
            Our mission is to guide young professionals toward hands-on
            experience that prepares them for their future careers.</p>
        </div>
      </section>

      {/* <!-- Features Sec  --> */}
      <section id="features" className="features">
        <h2 className="section-title">Our Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <i className="fa-regular fa-clock"></i>
            <h3>Internship Hours Tracker</h3>
            <p>Keep track of your OJT hours effortlessly with our built-in tracking tool, ensuring accuracy and compliance.</p>
          </div>
          <div className="feature-card">
            <i className="fa-regular fa-building"></i>
            <h3>Verified Companies</h3>
            <p>Connect only with trusted companies that value student training and development.</p>
          </div>
          <div className="feature-card">
            <i className="fa-solid fa-magnifying-glass"></i>
            <h3>Easy Internship Search</h3>
            <p>Quickly find OJT opportunities tailored to your field, location, and interests.</p>
          </div>
        </div>
      </section>

      {/* <!--  Contact Sec  --> */}
      <section id="contact" className="contact">
        <SectionTitle text="Contact Us" />
        <div className="contact-content">
          <ContactForm />
        </div>
      </section>

      {/* <!-- Footer  --> */}
      <footer className="footer">
        <p>&copy; 2025 JobHive. ganda ni eya.</p>
      </footer>
    </>
  )
}

export default App
