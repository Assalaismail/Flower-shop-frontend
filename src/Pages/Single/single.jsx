import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./single.css";

function Single() {
  const [item, setItem] = useState(null);
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getItem = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/item/getflower/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getItem();
  }, [id]);

  return (
    <div>
      <div className="single-item">
        <div className="s-left">
          <img src={item?.image?.url} alt="product is not displaying" />
        </div>

        <div className="s-right">
          <h1>{item?.name}</h1>

          <div className="s-price">
            <h3>${item?.price_after_discount}</h3>
          </div>
          <p>{item?.description}</p>

          <button className="s-btn" onClick={() => navigate("/order")}>
            Add to Cart
          </button>
        </div>
      </div>


      <div className="section-plus">
        <div className="delivery">
          <h2 className="delivery-h2"> Delivery Info</h2>
          <h3 className="delivery-time">Monday - Saturday by 7 p.m</h3>
          <p className="delivery-p">
            Tuesday - Saturday by 7 p.m Due to high volume & Beirut traffic,{" "}
            <span>we do not take requests for certain delivery times</span>-
            daily orders are delivered by the most efficient route & guaranteed
            by 7 p.m. <br></br> <br></br>We deliver to many, many zip codes. If
            you need a delivery outside of our current zones, give us a call or
            e-mail us! <br></br> <br></br>Delivery fee is $15-$45 & determined
            by the burrough, base price + mileage. No minimum required.
          </p>
        </div>

        <div className="pick-up">
          <h2 className="delivery-h2">Pick Up Info</h2>
          <h3 className="delivery-time">Monday - Saturday by 7 p.m</h3>
          <p className="delivery-p">
            If you are seeking to gather information or require assistance, our
            dedicated team is available at the studio from Monday to Saturday,
            throughout the entirety of our regular operating hours.<br></br> <br></br>Please feel
            free to visit us during this time, as we are here to provide you
            with the necessary support and information you need.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Single;
