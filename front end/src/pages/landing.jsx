import Navbar from "../components/navbar"
import FeatureCard from "../components/featurecard"
import SectionTitle from "../components/sectiontitle.jsx"
import ContactForm from "../components/contactform.jsx"
import './landing.css'

const Landing = () => {
  return (
    <section className="navsec">
      
      <Navbar />

      {/* <!-- landing page --> */}
      <section className="frontpage">
        <div className="frontpage-content">
          <h1><span className="gray">Unlock Your </span>
            <br /><span className="yilo">Full Career Potential</span>
            <br /><span className="gray">With</span> <span className="yilo">JobHive</span>
          </h1>
          <p>Bringing Students and Companies together. Find. Apply. Succed!</p>
          <a href="#create" className="btn-cta">Get Started</a>
        </div>
      </section>


      {/* <!-- About sec  --> */}
      <section id="about" className="about">
        <h2 className="section-title"><span className="yilo">About</span> Us</h2>
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
        <h2 className="section-title">Our <span className="yilo"> Features</span></h2>
        <div className="features-grid">
          <div className="feature-card">
            <i className="fa-regular fa-clock"></i>
            <h3>Internship Hours Tracker</h3>
            <p>Keep track of your OJT hours effortlessly with our built-in tracking tool, ensuring accuracy and
              compliance.</p>
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
      <ContactForm />
    </section>

  )
}

export default Landing