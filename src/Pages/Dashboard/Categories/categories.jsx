import React, { useState, useEffect, useCallback , useReducer } from "react";
import axios from "axios";
import swal from "sweetalert";

import { useNavigate } from "react-router";
import "../Categories/categories.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import EditCategory from "./editCategory";
import PopupCategory from "./popcategory";

function Categories(props) {
  const [refresh, setRefresh] = useReducer((x) => x + 1, 0);

    const [category, setCategory] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState("");
    const [products, setProducts] = useState("");
    const [showPopup, setShowPopup] = useState(false);
  const [name_category, setName_category] = useState("");


    const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  
    const getcategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/category/getcategory");
        setCategory(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    useEffect(() => {
        getcategories();
      }, []);

  //delete item
  const deleteUser = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this category!",
      icon: "warning",
      buttons: {
        cancel: "Cancel",
        confirm: {
          text: "Delete",
          value: true,
          className: "btn-danger",
          visible: true,
          closeModal: true,
        },
      },
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await axios.delete(`http://localhost:5000/category/delcategory/${id}`);
        getcategories();
        swal("Poof! The category has been deleted!", {
          icon: "success",
        });
      } else {
        swal("The item is safe!");
      }
    });
  };


   // add new category
const addCategory = async () => {
  const categoryData = {
    name_category: name_category
  };

  try {
    await axios.post("http://localhost:5000/category/addcategory", categoryData, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });

    setRefresh();
    getcategories();
    setShowPopup(false);

    swal({
      title: "Item added successfully!",
      icon: "success",
    });

    setName_category("");
  } catch (error) {
    console.error(error);
    swal({
      title: "Oops!",
      text: "Something went wrong. Please try again later.",
      icon: "error",
    });
  }
};


  const submitHandler = (e) => {
    e.preventDefault();
    addCategory();
  };

    ///////////////////////////////////////////////////////////
  // Define a callback function to refresh the items
const refreshItems = useCallback(async () => {
  await getcategories();
}, [getcategories]);
  ///////////////////////////////////////////////////////////


    // open the EditItemPopup component with the selected item
    const handleEditButtonClick = (item) => {
      setSelectedItem(item);
      setShowEditPopup(true);
    };
  
    // close the EditItemPopup component
    const handleEditPopupClose = () => {
      setShowEditPopup(false);
    };

    const handleAddItemButtonClick = () => {
      setShowPopup(true);
    };

    const handleCancelItemButtonClick = () => {
      setShowPopup(false);
     
  
     
    };

  return (

    <div className="tbl-wrper-category">
      <div class="container-add-itemmm">
        <button onClick={handleAddItemButtonClick} className="add-itemmm">
          <span className="add-item-icon-dash">&#43;</span>Add Category
        </button>
      </div>
      <table className="table-category">
        <thead>
          <tr className="first-category--">
            
            <th>Name</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(category) &&
            category.map((item, index) => {
              return (
                <tr className="" key={index}>
               
          
                  <td className="category-name"> {item.name_category} </td>
                  <td>
                    <button
                      alt=""
                      className="button-delete-item"
                      onClick={() => deleteUser(item._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>

                  <td>
                    <button
                      className="button-edit-item"
                      onClick={() => handleEditButtonClick(item)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {showPopup && (
        <PopupCategory
          onClose={handleCancelItemButtonClick}
          reloadItems={() => getcategories()}
        />
      )}
      {showEditPopup && (
  <EditCategory
    onClose={handleEditPopupClose}
    item={selectedItem}
    refreshItems={refreshItems} // Pass the refreshItems callback
  />
)}


{/* for the add item popup */}
<PopupCategory trigger={showPopup} setTrigger={() => setShowPopup(false)}>
        <div className="inputs-add-products">
          <div className="container-items-x">
            <h2 className="title-edit">Add Item:</h2>
            <div className="close-item-btn-container">
              <button
                className="close-item-btn-edit"
                onClick={handleCancelItemButtonClick}
              >
                x
              </button>
            </div>
          </div>

          <label className="labels-input-add">Category Name: </label>
          <input
            type="text"
            name="name"
            className="input-name-add"
            id="name"
            value={name_category}
            onChange={(e) => setName_category(e.target.value)}
          />

         
        </div>
        <div className="btn-pop-wrapper">
          <button className="btn-add-item" onClick={submitHandler}>
            Add
          </button>
          <button
            className="btn-cancel-item"
            onClick={handleCancelItemButtonClick}
          >
            Cancel
          </button>
        </div>
      </PopupCategory>

      {showPopup && (
        <PopupCategory
          onClose={() => setShowPopup(false)}
          reloadItems={() => getcategories()}
        />
      )}
    </div>
  );
}
export default Categories;
