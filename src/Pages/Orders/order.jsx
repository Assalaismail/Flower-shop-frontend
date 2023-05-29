import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./order.css";

function Order() {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );
  const [quantity, setQuantity] = useState(1);
  const [totallPrice, setTotalPrice] = useState();
  const [phone_number, setPhone_number] = useState("");
  const [address, setAddress] = useState("");

  function deleteProductFromLocalStorage(id) {
    const updatedProducts = cartItems.filter((product) => product._id !== id);
    localStorage.setItem("cartItems", JSON.stringify(updatedProducts));
  }
  const [canorder, setcanorder] = useState(true);

  function checkUserRole() {
    const userRole = sessionStorage.getItem("userType");
    const token = sessionStorage.getItem("token");

    // Get the user's role from session storage
    if (!token || !userRole) {
      // User has the 'user' role, so navigate to the desired page

      setcanorder(false);
    } else {
      setcanorder(true);
    }
  }

  const totalcalculator = () => {
    // Calculate the total price
    const cartquan = cartItems.map((item) => item.quantity);
    const cartprice = cartItems.map((item) => item.price_after_discount);
    var total = 0;
    const carttwo = [];
    for (let i = 0; i < cartquan.length; i++) {
      const item = {};

      item.price = cartprice[i];
      item.totalprice = cartprice[i];
      carttwo.push(item);
      total += item.totalprice;
    }

    setTotalPrice(total);
  };

  useEffect(() => {
    checkUserRole();
    totalcalculator();
  }, [cartItems]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (canorder) {
      const cartitemid = cartItems.map((item) => item._id);
      const cartquan = cartItems.map((item) => item.quantity);
      const cartname = cartItems.map((item) => item.name);
      const cartimage = cartItems.map((item) => item.image);

      const cartprice = cartItems.map((item) => item.price_after_discount);
      var total = 0;
      const cart = [];
      for (let i = 0; i < cartquan.length; i++) {
        const item = {};
        item.productID = cartitemid[i];

        item.name = cartname[i];
        item.image = cartimage[i];
        item.quantity = cartquan[i];
        item.price = cartprice[i];
        item.totalprice = cartprice[i];
        cart.push(item);
        total += item.totalprice;
      }

      // event.preventDefault();
      const response = await fetch("http://localhost:5000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart,
          payment_type: "Cash on Delivery",
          total_price: total,
          phone_number,
          address,
        }),
      });
      const data = await response.json();

      toast.success("your order is sent ", {
        position: toast.POSITION.TOP_RIGHT,
      });
      localStorage.clear();
      delayedRefresh();
    } else {
      toast.error("please sign in to continue this order", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const delayedRefresh = () => {
    setTimeout(function () {
      window.location.reload();
    }, 5000);
  };

  function clearLocalStorage() {
    swal({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      buttons: ["Cancel", "Yes, delete it!"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        localStorage.clear();
        window.location.reload();
        swal("Poof! Your file has been deleted!", {
          icon: "success",
        });
        window.location.reload();
      } else {
        swal("Your Order is safe!");
      }
    });
  }
  function handleProductClick(id) {
    swal({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      buttons: ["Cancel", "Yes, delete it!"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteProductFromLocalStorage(id);
        const updatedCartItems = cartItems.filter((item) => item._id !== id);
        setCartItems(updatedCartItems);

        swal("Poof! Your file has been deleted!", {
          icon: "success",
        });
        window.location.reload();
      } else {
        swal("Your Order is safe!");
      }
    });
  }
  useEffect(() => {}, [totallPrice]);

  return (
    <>
      <ToastContainer />
      <p className="Orders-page">Your Order</p>

      <div className="orders-div">
        <div className="order-style">
          {cartItems.map((item) => (
            <div className="order-det" key={item._id}>
              <div className="order-writing">
                <img
                  src={item.image}
                  alt="Product Image"
                  className="product-image"
                />
                <div className="order-title-desOrder">
                  <h2>{item.name}</h2>
                </div>

                <p className="desOrder"> {item.price_after_discount}$</p>
                <div className="quantity"></div>
              </div>
            </div>
          ))}
        </div>

        <form className="order-form">
              <div>
                <label htmlFor="name" className="res-label">
                  Phone Number:
                </label>
                <input
                  type="text"
                  id="phone_number"
                  name="phone_number"
                  value={phone_number}
                  onChange={(e) => setPhone_number(e.target.value)}
                  className="res-input"
                />
              </div>
              <br></br>
              <div>
                <label htmlFor="phone_nb" className="res-label">
                  Address in details:
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="res-input"
                  required
                />
              </div>
              <br></br>
              <div className="order-total">
          <div>
            <h2>Total:</h2>
          </div>
          <div>
            <p>{totallPrice} $</p>
          </div>
        </div>
        <br></br>
              <div>
              <button
          className="order-check"
          onClick={(event) => {
            handleSubmit(event);
          }}
        >
          Place Order
        </button>
              </div>
              </form>


        
     
        
      </div>
    </>
  );
}

export default Order;
