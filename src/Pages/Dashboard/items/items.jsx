import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import swal from "sweetalert";

import { useNavigate } from "react-router";
import "../items/items.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import EditItem from "../items/editItem";
import PopupItem from "../items/popupItem";

function Items(props) {
  let token = sessionStorage.getItem("token");

  const [product, setProduct] = useState([]);
  const [flippedItem, setFlippedItem] = useState(null);
  const { categoryId } = props;
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const getProducts = useCallback(async () => {
    try {
      if (categoryId === "") {
        const response = await axios.get(
          "http://localhost:5000/item/getflower"
        );
        setProduct(response.data);
        setItem(response.data);
      } else {
        const response = await axios.get(
          `http://localhost:5000/item/items/${categoryId}`
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

  //delete item
  const deleteUser = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this item!",
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
        await axios.delete(`http://localhost:5000/item/delflower/${id}`);
        getProducts(categoryId);
        swal("Poof! The item has been deleted!", {
          icon: "success",
        });
      } else {
        swal("The item is safe!");
      }
    });
  };

  // edit item
  const editItem = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/item/updflower/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            //   Authorization: `Bearer ${token}`,
          },
        }
      );
      getProducts();
      setShowEditPopup(false);
      swal("The item has been updated!", {
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

  // close the EditItemPopup component
  const handleEditPopupClose = (newItem) => {
    editItem(selectedItem._id, newItem);
  };

  return (
    <div className="tbl-wrper">
      <table className="table-item">
        <thead>
          <tr className="first-item--">
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>

            <th>Price</th>
            <th>Discounted %</th>
            <th>New Price</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(product) &&
            product.map((item, index) => {
              return (
                <tr className="" key={index}>
                  <td className="item-image">
                    {" "}
                    <img src={item.image.url} alt="product is not displaying" />
                  </td>
                  <td className="item-name"> {item.name} </td>
                  <td className="item-desc">{item.description}</td>

                  <td className="item-price">{item.price}</td>
                  <td className="item-discount-per">{item.discount_per}</td>
                  <td className="item-price-after">
                    {item.price_after_discount}
                  </td>
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
        <PopupItem
          onClose={() => setShowPopup(false)}
          reloadItems={() => getProducts()}
        />
      )}
      {showEditPopup && (
        <EditItem
          onClose={handleEditPopupClose}
          item={selectedItem}
          onEdit={(newItem) => editItem(selectedItem._id, newItem)}
        />
      )}
    </div>
  );
}
export default Items;
