import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import "./single.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Single() {
  const [item, setItem] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const [canorder, setcanorder] = useState(true);

function checkUserRole() {
  const userRole = sessionStorage.getItem("userType");
  const token = sessionStorage.getItem("token");

  // Get the user's role from session storage
  if (!token || !userRole) {
    // User is not logged in, set canorder to false
    setcanorder(false);
  } else {
    setcanorder(true);
  }
}

useEffect(() => {
  checkUserRole();
}, []);

useEffect(() => {
  const getItem = async () => {
    try {
      const response = await axios.get(
        `https://flower-shop.onrender.com/item/getflower/${id}`
      );
      setItem(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  getItem();
}, [id]);

const saveToLocalStorage = () => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const existingCartItemIndex = cartItems.findIndex(
    (items) => items._id === item._id
  );

  if (existingCartItemIndex !== -1) {
    swal({
      title: "Item already in cart",
      text: "Do you want to continue shopping or view the cart?",
      icon: "info",
      buttons: {
        continueShopping: {
          text: "Continue Shopping",
          value: "continueShopping",
        },
        viewCart: {
          text: "View Cart",
          value: "viewCart",
        },
      },
    }).then((value) => {
      if (value === "continueShopping") {
        navigate("/shop"); 
      } else if (value === "viewCart") {
        navigate("/order"); 
      }
    });
  } else {
    const firstImage = item?.image?.url;
    cartItems.push({
      _id: item._id,
      name: item.name,
      price: item.price,
      price_after_discount: item.price_after_discount,
      image: firstImage,
    });

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    swal({
      title: "Item added to cart",
      text: "Do you want to continue shopping or view the cart?",
      icon: "success",
      buttons: {
        continueShopping: {
          text: "Continue Shopping",
          value: "continueShopping",
        },
        viewCart: {
          text: "View Cart",
          value: "viewCart",
        },
      },
    }).then((value) => {
      if (value === "continueShopping") {
        navigate("/shop"); 
      } else if (value === "viewCart") {
        navigate("/order"); 
      }
    });
  }
};


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
                <button className="s-btn" onClick={saveToLocalStorage}>
                  Add to cart
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
