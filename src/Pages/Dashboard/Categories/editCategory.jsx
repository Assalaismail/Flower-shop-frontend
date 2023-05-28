import React, { useState } from "react";
import axios from "axios";
import "../items/editItem.css";
import swal from "sweetalert";

function EditCategory(props) {
  let token = sessionStorage.getItem("token");

  const [name_category, setName_category] = useState(props.item.name_category);
  const [itemid, setItemid] = useState(props.item._id);

  const [showPopup, setShowPopup] = useState(false);

  const handleNameChange = (event) => {
    setName_category(event.target.value);
  };

  const handleCancelItemButtonClick = () => {
    props.onClose();
  };

  const config1 = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedItem = {
      name_category,
    };
    try {
      await axios.put(
        `http://localhost:5000/category/updcategory/${itemid}`,
        updatedItem
      );
      props.onClose();
      setShowPopup(false);

      // Invoke the refreshItems callback to refresh the items
      props.refreshItems();

      swal("The category has been updated!", {
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
          <h2 className="title-edit">Edit Category</h2>
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
            id="name_category"
            value={name_category}
            className="input-name-edit"
            onChange={handleNameChange}
          />

          <button type="submit" className="btn-edit-item">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditCategory;
