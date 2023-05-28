import React from "react";
import "../items/popupItem.css";

const PopupItem = (props) => {
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

export default PopupItem;