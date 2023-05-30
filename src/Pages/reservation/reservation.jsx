import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./reservation.css";
import book1 from "../../Assets/book.jpg";
import book2 from "../../Assets/book2.jpg";
import img1 from "../../Assets/img1.jpg";
import img2 from "../../Assets/img2.jpg";
import img3 from "../../Assets/img3.jpg";
import book3 from "../../Assets/res-img.jpg";

function Reservation() {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [phone_nb, setPhone_nb] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [tools, setTools] = useState([]);

  const [date, setDate] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const addReservation = async () => {
    const reservationData = {
      userId: "645cadcc4811979031291715",
      name: name,
      phone_nb: phone_nb,
      email: email,
      date: date,
      address: address,
      message: message,
      tools: tools,
    };

    try {
      const response = await axios.post(
        "https://flower-shop.onrender.com/res/reservations",
        reservationData
      );

      if (response.status === 200 || response.status === 201) {
        swal({
          title: "Reservation added successfully!",
          icon: "success",
        });
        setName("");
        setEmail("");
        setPhone_nb("");
        setAddress("");
        setDate(new Date());
        setMessage("");
        setTools([]);
      }
    } catch (error) {
      console.error(error);
      swal({
        title: "Oops!",
        text: "Something went wrong. Please try again later.",
        icon: "error",
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addReservation();
  };

  const openFormPopup = () => {
    setShowForm(true);
  };

  const closeFormPopup = () => {
    setShowForm(false);
  };

  const handleToolChange = (value) => {
    if (tools.includes(value)) {
      setTools(tools.filter((tool) => tool !== value));
    } else {
      setTools([...tools, value]);
    }
  };

  return (
    <div>
      <p className="bookyourevent">Book your Event</p>
      <div className="res-image-container">
        <img src={book1} className="res-book1" alt="Book 1" />
        <img src={book2} className="res-book2" alt="Book 2" />
      </div>

      <div className="res-event">
        <p className="res-event-title">Flowers for every event.</p>
        <p className="res-event-text">
          Engaged? Hosting a shower? Looking for a Beirut wedding florist who
          will work with your ideas & help maximize your budget? Let's work
          together to bring your event to life!
        </p>
        <p className="res-event-text1">
          Long story short...we really love getting creative & flowering events
          of all sizes (in Beirut & beyond)! And all the amazing people we meet
          along the way is just icing on the cake. We offer tailor-made floral
          designs to make your day extra, extra special. Wild, whimsical, &
          all-natural - our designs are thoughtfully curated, sustainable & made
          specifically for YOU!
        </p>
        <p className="res-event-text2">
          From intimate dinners & elopements to full service weddings, we're
          here to help you every step of the way. Click the button below, tell
          us all about your event & we'll be in touch!
        </p>
        <button className="res-button" onClick={openFormPopup}>
          Give us the details!
        </button>
      </div>

      {showForm && (
        <div className="res-popup">
          <div className="res-popup-content">
            <img src={book3} className="res-book3" alt="Book 1" />

            <h2 className="res-h2">Event Inquiry Form</h2>
            <form className="res-form">
              <div>
                <label htmlFor="name" className="res-label">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="res-input"
                />
              </div>
              <div>
                <label htmlFor="phone_nb" className="res-label">
                  Phone Number (xxxxxxxx):
                </label>
                <input
                  type="text"
                  id="phone_nb"
                  name="phone_nb"
                  value={phone_nb}
                  onChange={(e) => setPhone_nb(e.target.value)}
                  className="res-input"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="res-label">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="res-input"
                />
              </div>
              <div>
                <label htmlFor="date" className="res-label">
                  Date:
                </label>
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  dateFormat="yyyy-MM-dd"
                  id="date"
                  name="date"
                  className="res-input"
                  required
                />
              </div>
              <div>
                <label htmlFor="address" className="res-label">
                  Address:
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="res-input-address"
                  required
                />
              </div>
              <br></br>

              <div className="tools">
                <label className="res-label-tool">
                 Floral designs needed for the following:
                </label>

                <div className="tools-check">
                  <div>
                    <label htmlFor="tool1">
                      <input
                        type="checkbox"
                        id="tool1"
                        name="tool1"
                        value="Wedding bouquet"
                        checked={tools.includes("Wedding bouquet")}
                        onChange={(e) => handleToolChange(e.target.value)}
                      />
                     &nbsp;  Wedding bouquet
                    </label>
                  </div>
                  <div>
                    <label htmlFor="tool2">
                      <input
                        type="checkbox"
                        id="tool2"
                        name="tool2"
                        value="Wedding party bouquets"
                        checked={tools.includes("Wedding party bouquets")}
                        onChange={(e) => handleToolChange(e.target.value)}
                      />
                     &nbsp; Wedding party bouquets
                    </label>
                  </div>
                  <div>
                    <label htmlFor="tool3">
                      <input
                        type="checkbox"
                        id="tool3"
                        name="tool3"
                        value="Long tables"
                        checked={tools.includes("Long tables")}
                        onChange={(e) => handleToolChange(e.target.value)}
                      />
                     &nbsp; Long tables
                    </label>
                  </div>
                  <div>
                    <label htmlFor="tool4">
                      <input
                        type="checkbox"
                        id="tool4"
                        name="tool4"
                        value="Aisle"
                        checked={tools.includes("Aisle")}
                        onChange={(e) => handleToolChange(e.target.value)}
                      />
                    &nbsp;  Aisle
                    </label>
                  </div>
                  <div>
                    <label htmlFor="tool5">
                      <input
                        type="checkbox"
                        id="tool5"
                        name="tool5"
                        value="Crowns"
                        checked={tools.includes("Crowns")}
                        onChange={(e) => handleToolChange(e.target.value)}
                      />
                     &nbsp; Crowns
                    </label>
                  </div>
                  <div>
                    <label htmlFor="tool6">
                      <input
                        type="checkbox"
                        id="tool6"
                        name="tool6"
                        value=" Sweetheart table"
                        checked={tools.includes(" Sweetheart table")}
                        onChange={(e) => handleToolChange(e.target.value)}
                      />
                    &nbsp;  Sweetheart table
                    </label>
                  </div>
                </div>
              </div>
              <br></br>

              <div>
                <label htmlFor="message" className="details">
                  Event Details: <br></br>
                  <p className="details">
                    (color palette, inspiration, mood, aesthetic, theme, etc.)
                  </p>
                </label>
                <br></br>
                <textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="res-input-details"
                ></textarea>
              </div>

              <br></br>
            </form>
            <button
              type="submit"
              className="res-submit-btn"
              onClick={submitHandler}
            >
              Submit
            </button>
            <button className="res-close-btn" onClick={closeFormPopup}>
              Close
            </button>
          </div>
        </div>
      )}

      <div className="res-images">
        <img src={img1} alt="Flower" className="res-image" />
        <img src={img2} alt="Flower" className="res-image" />
        <img src={img3} alt="Flower" className="res-image1" />
      </div>
    </div>
  );
}

export default Reservation;
