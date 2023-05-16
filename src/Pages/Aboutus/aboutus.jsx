import React, { useState, useEffect, useCallback } from "react";
import "../Aboutus/aboutus.css";
import flori from "../../Assets/fiori1.png";

function Aboutus() {
  return (
    <div className="aboutus-wrapper">
    <div className="aboutus-container">
      <div className="text-container">
        <h1 className="title-aboutus">About us</h1>

        <em className="em-aboutus">
          –Flowers are God’s finest creatures without souls–
        </em>
        {/* <p className="text-aboutus">
          At <span className="span-aboutus">Fleur de vie</span>, we believe that
          flowers have the power to brighten any day and bring joy to any
          occasion. That's why we're passionate about crafting stunning
          arrangements that not only look beautiful, but also convey the perfect
          message. Whether you're celebrating a special milestone, expressing
          gratitude, or simply brightening up your own space, our expert
          florists are here to help.
        </p> */}

        <p className="text-aboutus2">
          We're a family-owned business with a deep love for all things floral.
          From classic roses and lilies to exotic orchids and tropical blooms,
          we offer a wide variety of fresh flowers to suit every taste and
          style. We source our blooms from local and international growers to
          ensure the highest quality and freshest selection, and we're committed
          to sustainable and ethical practices.
        </p>

        <p className="text-aboutus3">
          But more than just a flower shop, Fleur de vie is a community of
          people who share a love for beauty, creativity, and connection. We
          believe in the power of flowers to bring people together, to brighten
          up someone's day, and to create memories that last a lifetime. And
          we're dedicated to making your experience with us as special and
          memorable as the flowers themselves.
        </p>

        <p className="text-aboutus4">
          Thank you for choosing Fleur de vie. We look forward to bringing a
          little bit of beauty and joy into your life.
        </p>
      </div>
      <div className="image-container">
        <img src={flori} alt="flowers" className="aboutus-image" />
      </div>
    </div>
  </div>
);
}


export default Aboutus;
