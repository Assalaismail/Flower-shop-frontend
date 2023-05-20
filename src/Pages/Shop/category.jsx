import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../Shop/category.css'; 
import Shop from '../Shop/shop';


function Category() {
  const [category, setCategory] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [products, setProducts] = useState("");

  const getcategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/category/getcategory");
      setCategory(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const getallitems= async () => {
    try {
      const response = await axios.get("http://localhost:5000/item/getflower");
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
    <div className="category-container">
      <div className="category-sidebar">
        <div className="category-buttons">
          <button value="" onClick={handleButtonClick} className={`category-button ${selectedCategoryId === "" ? "selected" : ""}`}>All Products</button>
          {Array.isArray(category) && category.map((item, index) => (
            <button key={index} value={item._id} onClick={handleButtonClick} className={`category-button ${selectedCategoryId === item._id ? "selected" : ""}`}>{item.name_category}</button>
          ))}
        </div>
      </div>
      <div className="shop-container">
        <Shop categoryId={selectedCategoryId} filteredCategory={filteredCategory} />
      </div>
    </div>
  );
  
  
}

export default Category;