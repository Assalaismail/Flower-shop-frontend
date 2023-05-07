import React, { useState, useEffect, useCallback } from "react";
import "../Home/home.css";
import slider1 from "../../Assets/image1.jpg";
import image2 from "../../Assets/image2.jpg";
import image3 from "../../Assets/image3.jpg";
import round1 from "../../Assets/sura.jpg";
import round2 from "../../Assets/round2.jpg";
import round3 from "../../Assets/sura2.jpg";

function Home() {
  const [slideIndex, setSlideIndex] = useState(1);

  const showSlides = useCallback(
    (n) => {
      const slides = document.getElementsByClassName("imgg");
      const dots = document.getElementsByClassName("dot");
      if (n > slides.length) {
        setSlideIndex(1);
      }
      if (n < 1) {
        setSlideIndex(slides.length);
      }
      for (let i = 0; i < slides.length; i++) {
        if (slides[i]) {
          // add check to ensure slides[i] is defined
          slides[i].style.display = "none";
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

      <br />

      <div style={{ textAlign: "center" }}>
        <span className="dot" onClick={() => currentSlide(1)}></span>
        <span className="dot" onClick={() => currentSlide(2)}></span>
        <span className="dot" onClick={() => currentSlide(3)}></span>
      </div>

      <div className="daily-flowers">
        <div>
          <p className="daily-title">Daily Flowers</p>
          <p className="daily-text">
            Looking to send one-of-a-kind flowers to someone special? Check out
            our daily flowers menu & <br></br>place your order for a Beirut
            flower delivery or studio pick up!
          </p>
          <button class="daily-button" >Order here!</button>

        </div>

        <div className="daily-images">
          <img src={round1} alt="Flower image" class="round-image" />
          <img src={round2} alt="Flower image" class="round-image" />
          <img src={round3} alt="Flower image" class="round-image1" />
        </div>
      </div>

      <div className="event">
        <div>
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
          <button className="event-button">Book your event!</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
