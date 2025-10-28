const ContactForm = () => {
  return (
    <section id="contact" className="contact">
        <h2 className="contact-title"><span className="yilo">Contact</span> Us</h2>
        <p className="subtitle">Send us message and we'll respond as soon as possible. </p>
        <div className="contact-content">
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
        </div>
      </section>
  )
}

export default ContactForm;