import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import swal from "sweetalert";

import { useNavigate } from "react-router";
import "../Categories/categories.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import EditCategory from "./editCategory";
import PopupCategory from "./popcategory";

function Categories(props) {
    const [category, setCategory] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState("");
    const [products, setProducts] = useState("");
    const [showPopup, setShowPopup] = useState(false);

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

  // edit item
  const editCategory = async (id) => {
   
    try {
       
      const response = await axios.put(
        `http://localhost:5000/category/updcategory/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          
          },
        }
      );
      getcategories();
      setShowEditPopup(false);
      
      swal("The category has been updated!", {
        icon: "success",
      });
    } catch (error) {
      console.error(error);
    }
  };

  // open the EditItemPopup component with the selected item
  const handleEditButtonClick = (item) => {
    setSelectedItem(item);
    setShowEditPopup(true);
  };

//   close the EditItemPopup component
  const handleEditPopupClose = (newItem) => {
    editCategory(selectedItem._id, newItem);
  };

  return (

    <div className="tbl-wrper-category">
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
          onClose={() => setShowPopup(false)}
          reloadItems={() => getcategories()}
        />
      )}
      {showEditPopup && (

        <EditCategory
          onClose={handleEditPopupClose}
          item={selectedItem}
          onEdit={(newItem) => editCategory(selectedItem._id, newItem)}
        />
      )}
    </div>
  );
}
export default Categories;
