import React, { useState, useEffect } from "react";
import axios from "axios";
import "../orders/order.css";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Ordersdash() {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/order");
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const deleteOrder = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this order!",
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
        await axios.delete(`http://localhost:5000/order/${id}`);
        getOrders();
        swal("Poof! The order has been deleted!", {
          icon: "success",
        });
      } else {
        swal("The order is safe!");
      }
    });
  };

  return (
    <div className="tbl-wrper-res">
      <table className="table-res">
        <thead>
          <tr className="first-res--">
            
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total Price</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(orders) &&
            orders.map((order) => (
              <tr className="" key={order._id}>
                
                <td>
                  {order.cart.map((item) => (
                    <div key={item.productID._id}>{item.productID.name}</div>
                  ))}
                </td>
                <td>
                  {order.cart.map((item) => (
                    <div key={item.productID._id}>{item.quantity}</div>
                  ))}
                </td>
                <td>
                  {order.cart.map((item) => (
                    <div key={item.productID._id}>${item.price}</div>
                  ))}
                </td>
                <td>{order.total_price}</td>
                <td>{order.address}</td>
                <td>{order.phone_number}</td>
                <td>
                  <button
                    className="button-delete-res"
                    onClick={() => deleteOrder(order._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Ordersdash;