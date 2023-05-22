import React from "react";
import "../Categories/popcategory.css";

const PopupCategory = (props) => {
  return props.trigger ? (
    <div className='popupItem'>
      <div className='popup-inner'>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
};

export default PopupCategory;