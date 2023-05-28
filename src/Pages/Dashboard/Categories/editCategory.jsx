import React, { useState } from 'react';
import axios from 'axios';
import '../items/editItem.css';

function EditCategory(props) {
  let token=sessionStorage.getItem("token")

  const [name_category, setName_category] = useState(props.item.name_category);
  const [itemid, setItemid] = useState(props.item._id);

 
  const [showPopup, setShowPopup] = useState(false);



  const config1 = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const handleSubmit = async (event) => {
   
    const data={name_category:name_category}
   
    try {
      await axios.put(`http://localhost:5000/category/updcategory/${itemid}`, data);
      console.log("the update is done ")
      props.onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="popupItem-edit">
      <div className="popup-inner-edit">
        <div className='title-close-edit'>
          <h2 className='title-edit'>Edit Item</h2>
          <button className='close-item-btn-edit' onClick={() => window.location.reload()}>
            x
          </button>
        </div>
        <form  className="inputs-add-products-edit"> 
          <label className="labels-input-edit">Name:</label>
          <input type="text" id="name_category" value={name_category} className="input-name-edit" onChange={(e)=>setName_category(e.target.value)} />


          <button type="submit"  onClick={()=> handleSubmit()}  className="btn-edit-item">
         Save Changes
          </button>
      </form>
 </div>
 </div>
   );
 }

export default EditCategory;

