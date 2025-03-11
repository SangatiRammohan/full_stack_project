import React, { useState } from "react";
import "./ContactSection.css";

const ContactSection = () => {
  const [openAccordion, setOpenAccordion] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  const FAQItems = [
    { question: "Who lead your tours?", answer: "Our experienced local guides lead all tours." },
    { question: "Do all guides speak English?", answer: "Yes, all our guides are fluent in English." },
    { question: "Do your guides adapt to their public?", answer: "Our guides tailor experiences for different audiences." },
    { question: "Do you offer any discount if I book several tours?", answer: "We provide group discounts for multiple bookings." },
    { question: "What if I need to cancel my reservation?", answer: "Cancellations are subject to our refund policy." },
  ];

  return (
    <div className="contact-container">
      <h1>Contact us </h1>
      <div className="office-locations">
        <div className="office-card">
          <img src="https://source.unsplash.com/400x250/?newyork" alt="delhi" />
          <h3>Delhi Office</h3>
          <p>📍delhi headquaters, 700927</p>
          <p>🕒 Monday - Friday: 8 am - 6 pm</p>
          <p>📞 +91 8888888888</p>
          <p>📧 CityPulse@gmail.com</p>
        </div>
        <div className="office-card">
          <img src="https://source.unsplash.com/400x250/?paris" alt="Hyderabad" />
          <h3>Hyderabad Office</h3>
          <p>📍 Madhapur, 500092</p>
          <p>🕒 Monday - Friday: 8 am - 6 pm</p>
          <p>📞 +91 8888888888</p>
          <p>📧 CityPulse@gmail.com</p>
        </div>
        <div className="office-card">
          <img src="https://source.unsplash.com/400x250/?copenhagen" alt="kerala" />
          <h3>kerala Office</h3>
          <p>📍 coiambotre, 455678</p>
          <p>🕒 Monday - Friday: 8 am - 6 pm</p>
          <p>📞 +91 8888888888</p>
          <p>📧 CityPulse@gmail.com</p>
        </div>
      </div>

      <div className="faq-contact">
        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          {FAQItems.map((item, index) => (
            <div key={index} className="faq-item">
              <button className="faq-question" onClick={() => toggleAccordion(index)}>
                {item.question} <span>{openAccordion === index ? "−" : "+"}</span>
              </button>
              {openAccordion === index && <p className="faq-answer">{item.answer}</p>}
            </div>
          ))}
        </div>

        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} required />
            <input type="tel" name="phone" placeholder="Phone number" value={formData.phone} onChange={handleInputChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
            <textarea name="message" placeholder="Message" value={formData.message} rows={8} onChange={handleInputChange} required />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
