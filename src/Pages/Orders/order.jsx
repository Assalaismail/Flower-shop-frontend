import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./order.css";


function Order() {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );
  const [phone_number, setPhone_number] = useState("");
  const [address, setAddress] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) => ({ ...item, quantity: 1 }))
    );
  }, []);

  function deleteProductFromLocalStorage(id) {
    const updatedProducts = cartItems.filter((product) => product._id !== id);
    localStorage.setItem("cartItems", JSON.stringify(updatedProducts));
  }

  const [canorder, setcanorder] = useState(true);

  function checkUserRole() {
    const userRole = sessionStorage.getItem("userType");
    const token = sessionStorage.getItem("token");

    if (!token || !userRole) {
      setcanorder(false);
    } else {
      setcanorder(true);
    }
  }

  const handleQuantityChange = (index, quantity) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = quantity;
    setCartItems(updatedCartItems);
  };

  const totalcalculator = () => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price_after_discount * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  useEffect(() => {
    checkUserRole();
    totalcalculator();
  }, [cartItems]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (canorder) {
      if (cartItems.length === 0) {
        toast.error("The cart is empty. Please add products to your cart.", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }

      if (!address || !phone_number) {
        toast.error("Please fill in the address and phone number fields.", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }

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
        item.totalprice = cartquan[i] * cartprice[i];
        cart.push(item);
        total += item.totalprice;
      }

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

      toast.success("Your order is sent", {
        position: toast.POSITION.TOP_RIGHT,
      });
      localStorage.clear();
      delayedRefresh();
    } else {
      toast.error("Please sign in to continue this order", {
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
    if (cartItems.length === 0) {
      swal("No products to delete.", {
        icon: "info",
      });
      return;
    }
  
    swal({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      buttons: ["Cancel", "Yes, delete it!"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        localStorage.clear();
        setCartItems([]); // Clear cartItems state
        swal("Poof! Your order has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your order is safe!");
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

  useEffect(() => {}, [totalPrice]);

  return (
    <>
      <ToastContainer />
      <p className="Orders-page">Your Order</p>

      <div className="orders-div">
        <div className="order-style">
          {cartItems.map((item, index) => (
            <div className="order-det" key={item._id}>
              <div className="order-writing">

          
              <div className="trashhOrder">
                  <button
                    className="delete-icon"
                    onClick={() => handleProductClick(item._id)}
                  >x</button>
                </div>
                <img
                  src={item.image}
                  alt="Product Image"
                  className="product-image"
                />
                <div className="order-title-desOrder">
                  <h2>{item.name}</h2>
                </div>
                <p className="desOrder"> {item.price_after_discount}$</p>
                <div className="quantity">
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        index,
                        item.quantity - 1 >= 1 ? item.quantity - 1 : 1
                      )
                    }
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(index, parseInt(e.target.value))
                    }
                  />
                  <button
                    onClick={() => handleQuantityChange(index, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                
              </div>
              <div className="order-total-price">
                <p>Total: {item.price_after_discount * item.quantity}$</p>
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
              <p>{totalPrice} $</p>
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
            <button className="orderalldelete" onClick={() => clearLocalStorage()}>
          Delete Order
        </button>
          </div>
        </form>
        
      </div>
    </>
  );
}

export default Order;
