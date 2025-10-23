import Navbar from "../components/navbar"
import FeatureCard from "../components/featurecard"
import SectionTitle from "../components/sectiontitle.jsx"
import ContactForm from "../components/contactform.jsx" 

const Landing = () => {
  return (
    <>
    
      <Navbar />
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
          <FeatureCard 
          icon="fa-regular fa-clock" 
          title="Internship Hours Tracker" 
          description="Keep track of your OJT hours effortlessly with our built-in tracking tool, ensuring accuracy and compliance."
          />
          <FeatureCard 
          icon="fa-regular fa-building" 
          title="Verified Companies" 
          description="Connect only with trusted companies that value student training and development."
          />
          <FeatureCard 
          icon="fa-solid fa-magnifying-glass" 
          title="Easy Internship Search" 
          description="Quickly find OJT opportunities tailored to your field, location, and interests."
          />
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

export default Landing