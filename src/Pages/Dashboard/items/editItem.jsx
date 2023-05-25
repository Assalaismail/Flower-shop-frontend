import React, { useState, useCallback } from "react";
import axios from "axios";
import "../items/editItem.css";
import swal from "sweetalert";
import PopupItem from "../items/popupItem";


function EditItem(props) {
  let token = sessionStorage.getItem("token");

  const [name, setName] = useState(props.item.name);
  const [itemid, setItemid] = useState(props.item._id);
  const [description, setDescription] = useState(props.item.description);
  const [price, setPrice] = useState(props.item.price);
  const [discountPer, setDiscountPer] = useState(props.item.discount_per);
  const [showPopup, setShowPopup] = useState(true);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleDiscountPerChange = (event) => {
    setDiscountPer(event.target.value);
  };

  const handleCancelItemButtonClick = () => {
    props.onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedItem = {
      name,
      description,
      price,
      discount_per: discountPer,
    };
    try {
      await axios.put(`http://localhost:5000/item/updflower/${itemid}`, updatedItem);
      props.onClose();
      setShowPopup(false);
  
      // Invoke the refreshItems callback to refresh the items
      props.refreshItems();
  
      swal("The item has been updated!", {
        icon: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="popupItem-edit">
      <div className="popup-inner-edit">
        <div className="title-close-edit">
          <h2 className="title-edit">Edit Item</h2>
          <button
            className="close-item-btn-edit"
            onClick={handleCancelItemButtonClick}
          >
            x
          </button>
        </div>
        <form onSubmit={handleSubmit} className="inputs-add-products-edit">
          <label className="labels-input-edit">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            className="input-name-edit"
            onChange={handleNameChange}
          />

          <label className="labels-input-edit">Description:</label>
          <textarea
            id="description"
            value={description}
            className="input-name-edit-desc"
            onChange={handleDescriptionChange}
          />

          <label className="labels-input-edit">Price ($):</label>
          <input
            type="text"
            id="price"
            value={price}
            className="input-name-edit"
            onChange={handlePriceChange}
          />

          <label className="labels-input-edit">Discount (%):</label>
          <input
            type="text"
            id="discount-per"
            value={discountPer}
            className="input-name-edit"
            onChange={handleDiscountPerChange}
          />
          <button type="submit" className="btn-edit-item">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditItem;
