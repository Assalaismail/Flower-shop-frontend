import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "../Shop/shop.css";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";

function Shop(props) {
  // let id=sessionStorage.getItem("user_id")
  // let token=sessionStorage.getItem("token")
  const [product, setProduct] = useState([]);
  const [flippedItem, setFlippedItem] = useState(null);
  const { categoryId } = props;
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  const getProducts = useCallback(async () => {
    try {
      if (categoryId === "") {
        const response = await axios.get(
          "https://flower-shop.onrender.com/item/getflower"
        );
        setProduct(response.data);
        setItem(response.data);
      } else {
        const response = await axios.get(
          `https://flower-shop.onrender.com/item/items/${categoryId}`
        );
        setProduct(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [categoryId]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);



  const saveToLocalStorage = () => {
    // Get the existing cart items from local storage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
    // Check if the product is already in the cart
    const existingCartItemIndex = cartItems.findIndex(
      (items) => items._id === item._id
    );
  
    if (existingCartItemIndex !== -1) {
      
    } else {
     
      const firstImage = item?.image?.url; // Get the image URL
      cartItems.push({
        _id: item._id,
        name: item.name,
        price: item.price,
        price_after_discount: item.price_after_discount,
        image: firstImage, 
      });
    }
  
    // Save the updated cart items to local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  return (
    <div>
      <p className="p1">
        You can explore an exquisite assortment of flower bouquets at <em>Fleur de
        Vie,</em> <br></br>organized into various categories. 
      </p>
      <p className="p2">Don't wait too long to make your
        purchase!</p>
      <div className="product-container">
        {Array.isArray(product) &&
          product.map((item, index) => (
            <div
              className={
                flippedItem === item._id ? "product-card flip" : "product-card"
              }
              key={index}
            >
              <div className="front">
                {item.discount_per === 0 ? null : (
                  <div className="discount">{item.discount_per}%</div>
                )}
                <div className="image-product">
                  <img src={item.image.url} alt="product is not displaying" />
                </div>
                <div className="content-product">
                  <h3>{item.name}</h3>
                </div>
                <div className="price">
                  {item.price === item.price_after_discount ? (
                    <h3>{item.price}$</h3>
                  ) : (
                    <div className="price">
                      <h3>{item.price_after_discount}$</h3>
                      <h4>{item.price}$</h4>
                    </div>
                  )}
                </div>

                <div className="button-card">
                  <button onClick={() => navigate(`/single/${item._id}`)}>
                    Details
                  </button>

                  <button onClick={saveToLocalStorage}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Shop;
