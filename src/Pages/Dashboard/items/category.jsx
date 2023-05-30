import React, { useState, useEffect } from "react";
import axios from 'axios';
import Items from "./items";
import '../items/category.css'


function Categorydashitem() {
  const [category, setCategory] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [products, setProducts] = useState("");

  const getcategories = async () => {
    try {
      const response = await axios.get("https://flower-shop.onrender.com/category/getcategory");
      setCategory(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const getallitems= async () => {
    try {
      const response = await axios.get("https://flower-shop.onrender.com/item/getflower");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getcategories();
    getallitems();
  }, []);

  const handleButtonClick = (e) => {
    const categoryId = e.target.value;
    setSelectedCategoryId(categoryId);
  }

  const filteredCategory = selectedCategoryId === "" ? products : category.filter((c) => c._id === selectedCategoryId);

  return (
    <div className="category-container-dash">
      <div className="category-sidebar-dash">
        <div className="category-buttons-dash">
          <button value="" onClick={handleButtonClick} className={`category-button-dash ${selectedCategoryId === "" ? "selected" : ""}`}>All Products</button>
          {Array.isArray(category) && category.map((item, index) => (
            <button key={index} value={item._id} onClick={handleButtonClick} className={`category-button-dash ${selectedCategoryId === item._id ? "selected" : ""}`}>{item.name_category}</button>
          ))}
        </div>
      </div>
      <div className="shop-container-dash">
        <Items categoryId={selectedCategoryId} filteredCategory={filteredCategory} />
      </div>
    </div>
  );
  
  
}

export default Categorydashitem;