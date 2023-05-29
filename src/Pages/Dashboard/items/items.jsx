import React, { useState, useEffect, useCallback, useReducer } from "react";
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
  const [refresh, setRefresh] = useReducer((x) => x + 1, 0);
  const [product, setProduct] = useState([]);
  const { categoryId } = props;
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount_per, setDiscount_per] = useState("");
  const [cat, setCat] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState([]);


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

  const getcategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/category/getcategory"
      );
      setCategory(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  ///////////////////////////////////////////////////////////
  // Define a callback function to refresh the items
const refreshItems = useCallback(async () => {
  await getProducts();
}, [getProducts]);
  ///////////////////////////////////////////////////////////

  useEffect(() => {
    getcategories();
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  //add new item
  const addItem = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("discount_per", discount_per);
    formData.append("category", cat);
    formData.append("image", image);

    try {
      await axios
        .post("http://localhost:5000/item/addflower", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            // Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setRefresh();
            getProducts();
          }
        }); // set the new state variable to true after adding item

      setShowPopup(false);

      swal({
        title: "Item added successfully!",
        icon: "success",
      });
      setName("");
      setDescription("");
      setPrice("");
      setDiscount_per("");
      setCat("");
      setImage(null);
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
    addItem();
  };

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

  const handleImageChange = async (event) => {
    event.preventDefault();
    setImage(event.target.files[0]);
  };

  return (
    <div className="tbl-wrper">
      <div class="container-add-itemmm">
        <button onClick={handleAddItemButtonClick} className="add-itemmm">
          <span className="add-item-icon-dash">&#43;</span>Add Item
        </button>
      </div>
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
          onClose={handleCancelItemButtonClick}
          reloadItems={() => getProducts()}
        />
      )}
      {showEditPopup && (
  <EditItem
    onClose={handleEditPopupClose}
    item={selectedItem}
    refreshItems={refreshItems} // Pass the refreshItems callback
  />
)}

{/* for the add item popup */}
      <PopupItem trigger={showPopup} setTrigger={() => setShowPopup(false)}>
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

          <label className="labels-input-add">Product Name: </label>
          <input
            type="text"
            name="name"
            className="input-name-add"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="labels-input-add">Product Description: </label>
          <textarea
            name="description"
            className="input-name-add"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label className="labels-input-add">Product Price ($):</label>
          <input
            type="text"
            name="price"
            className="input-name-add"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <label className="labels-input-add">Discount (%):</label>
          <input
            type="text"
            name="discount_per"
            className="input-name-add"
            id="discount_per"
            value={discount_per}
            onChange={(e) => setDiscount_per(e.target.value)}
          />

          <label className="labels-input-add">Category</label>
          <select
            id="category"
            name="category"
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="input-name-add"
          >
            <option value="">-- Select a category --</option>
            {Array.isArray(category) &&
              category.map((item, index) => (
                <option key={index} value={item._id}>
                  {item.name_category}
                </option>
              ))}
          </select>

          <label className="labels-input-add">Product Image</label>
          <input
            type="file"
            className="input-name-add"
            name="productImage"
            onChange={handleImageChange}
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
      </PopupItem>

      {showPopup && (
        <PopupItem
          onClose={() => setShowPopup(false)}
          reloadItems={() => getProducts()}
        />
      )}
    </div>
  );
}
export default Items;
