import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import '../Shop/shop.css'; 
import swal from 'sweetalert';
import { useNavigate } from "react-router";


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
      
      if (categoryId==="") {  
         const response = await axios.get("http://localhost:5000/item/getflower");
         setProduct(response.data);
         setItem(response.data);
      } else {
          const response = await axios.get(`http://localhost:5000/item/items/${categoryId}`);
          setProduct(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [categoryId])

  useEffect(() => {
    getProducts();
  }, [getProducts]);
 

  return (
  
    <div className="product-container">
      {Array.isArray(product) && product.map((item, index) => (
        <div 
          className={flippedItem === item._id ? "product-card flip" : "product-card"} 
          key={index}
        >

          <div className="front">
         
            { item.discount_per === 0 ? null : <div className="discount">{item.discount_per}%</div>}
            <div className="image-product">
              <img src={item.image.url} alt="product is not displaying"/>
            </div>
            <div className="content-product">
              <h3>{item.name}</h3>
            </div>
            <div className="price">
              {item.price === item.price_after_discount ? (
                <h3>{item.price}$</h3>
              ) : (
                <div className="price"> 
                  <h3>{ item.price_after_discount}$</h3> 
                  <h4>{item.price}$</h4>
                </div>
              )}
            </div>

            <div className="button-card">
            <button onClick={() => navigate("/single", { state: { id: item._id } })}>Details</button>

            <button >Add to Cart</button>
            </div>
          </div>
        </div>
      ))}
    </div>
    
  );
}

export default Shop;

