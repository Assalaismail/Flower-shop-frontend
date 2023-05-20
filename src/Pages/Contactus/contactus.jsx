import "../Contactus/contactus.css";
import axios from "axios";
import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
  const form = useRef();
  const [error, setError] = useState(null);

  const [myData, setmyData] = useState({
    fullName: "",
    mail: "",
    Message: "",
  });
  const { fullName, mail, Message } = myData;

  const onChange = (e) => {
    setmyData({ ...myData, [e.target.name]: e.target.value });
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      await emailjs.sendForm(
        "service_gw0ro8l",
        "template_ayp1suh",
        form.current,
        "AJHaUKy47TtehspQf"
      );

      console.log("email sent successfully");
      form.current.reset();
    } catch (error) {
      console.log("email sending failed", error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!mail) {
      setError("Email is required");
      return;
    }
    setError(null);
    const newContact = {
      fullName: fullName,
      mail: mail,
      Message: Message,
    };
    await sendEmail(e);

    try {
      await axios.post("http://localhost:5000/contactus", newContact);
      setmyData({
        fullName: "",
        mail: "",
        Message: "",
      });
    } catch (err) {
      console.log("error", err.response.data);
    }
  };

  return (
    <>
      <div className="contact-us">
        <div className="primary">
          <h1>Connect with us!</h1>
          <p>
            Our contact us form is the perfect way to reach out to us with any
            inquiries, comments, or concerns you may have, and we will make sure
            to get back to you as soon as possible with the information or
            assistance you need.
          </p>
        </div>

        <div className="secondary">
          <div className="insider">
            <div className="form">
              <form className="contact-form" ref={form} onSubmit={onSubmit}>
                <h1>CONTACT US</h1>
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={fullName}
                  placeholder="Enter your Full name"
                  onChange={onChange}
                  required
                />
                <label htmlFor="E-mail">E-mail</label>
                <input
                  type="text"
                  name="mail"
                  value={mail}
                  placeholder="Enter your email "
                  onChange={onChange}
                  required
                />
                {error === "Email is required" && (
                  <div style={{ color: "red" }}>{error}</div>
                )}
                <label htmlFor="Message">Message</label>
                <textarea
                  className="message"
                  type="text"
                  name="Message"
                  value={Message}
                  placeholder="Enter your Message"
                  onChange={onChange}
                  required
                />
                <button className="form-sbmt" type="submit" onClick={onSubmit}>
                  SEND
                </button>
              </form>
            </div>

            <div className="google-map">
              <div className="map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d700154.8364275048!2d34.763031620347284!3d34.04220159856187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f1793c2852b6d%3A0x4ae3841bff5dfd6!2sThe%20Flower%20Shop!5e0!3m2!1sen!2slb!4v1683400748185!5m2!1sen!2slb"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
