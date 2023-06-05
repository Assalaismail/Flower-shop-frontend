import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "../Home/home.css";
import slider1 from "../../Assets/image1.jpg";
import image2 from "../../Assets/image2.jpg";
import image3 from "../../Assets/image3.jpg";
import round1 from "../../Assets/sura.jpg";
import round2 from "../../Assets/round2.jpg";
import round3 from "../../Assets/sura2.jpg";
import aboutus from "../../Assets/sura (3).png";

function Home() {
  const [slideIndex, setSlideIndex] = useState(1);
  const [showMenu, setShowMenu] = useState(false);

  const showSlides = useCallback(
    (n) => {
      const slides = document.getElementsByClassName("imgg");
      const dots = document.getElementsByClassName("fade");
      if (n > slides.length) {
        setSlideIndex(1);
      }
      if (n < 1) {
        setSlideIndex(slides.length);
      }
      for (let i = 0; i < slides.length; i++) {
        if (slides[i]) {
          // add check to ensure slides[i] is defined
          slides[i].style.zIndex = -1;
        }
      }
      for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      if (slides[slideIndex - 1]) {
        // add check to ensure slides[slideIndex - 1] is defined
        slides[slideIndex - 1].style.display = "block";

      }
      if (dots[slideIndex - 1]) {
        // add check to ensure dots[slideIndex - 1] is defined
        dots[slideIndex - 1].className += " active";
      }
    },
    [slideIndex]
  );

  useEffect(() => {
    showSlides(slideIndex);
    const interval = setInterval(() => {
      plusSlides(1);
    }, 3000);
    return () => clearInterval(interval);
  }, [showSlides, slideIndex]);

  const plusSlides = (n) => {
    setSlideIndex(slideIndex + n);
  };

  const currentSlide = (n) => {
    setSlideIndex(n);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
    setShowMenu(false)
  };

  return (
    <div>
      <div className="slideshow-container">
        <ul>
          <li className="fade">
            <img className="imgg" src={slider1} alt="image one" />
          </li>
          <li className="fade">
            <img className="imgg" src={image2} alt="image two" />
          </li>
          <li className="fade">
            <img className="imgg" src={image3} alt="image three" />
          </li>
        </ul>
      </div>

      <div className="daily-flowers">
        <div>
          <p className="daily-title">Daily Flowers</p>
          <p className="daily-text">
            Looking to send one-of-a-kind flowers to someone special? Check out
            our daily flowers menu & <br></br>place your order for a Beirut
            flower delivery or studio pick up!
          </p>
          <Link to="/shop" className="black-button" style={{ color: 'black' }} onClick={scrollToTop}>
            <button className="daily-button">Order here!</button>
          </Link>
        </div>

        <div className="daily-images">
          <img src={round1} alt="Flower image" className="round-image" />
          <img src={round2} alt="Flower image" className="round-image" />
          <img src={round3} alt="Flower image" className="round-image1" />
        </div>
      </div>

      <div className="event">
        <p className="event-title">Weddings & Event Flowers</p>
        <p className="event-text">
          Do you have a special event coming up? Recently got engaged and
          looking for a wedding florist to<br></br> bring your vision to life?
          We offer whimsical, garden-like wildflowers designed specifically to
          make your<br></br> big day even more special.
        </p>
        <p className="event-text2">
          From budgeting to booking to breaking down, we're here to work with
          you every step of the way.
        </p>
        <Link to="/reservation" className="black-button" onClick={scrollToTop}>
          <button className="event-button">Book your event!</button>
        </Link>
      </div>

      <div className="home-about-us">
        <div className="about-us-image">
          <img src={aboutus} alt="Image Description" />
        </div>
        <div className="about-us-content">
          <p>
            At Fleur de vie, we believe that flowers have the power to brighten
            any day and bring joy to any occasion. That's why we're passionate
            about crafting stunning arrangements that not only look beautiful,
            but also convey the perfect message. Whether you're celebrating a
            special milestone, expressing gratitude, or simply brightening up
            your own space, our expert florists are here to help.
          </p>
          <Link to="/aboutus" className="black-button" onClick={scrollToTop}>
            <button className="read-more-button">Read More</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
