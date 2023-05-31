import React, { useState, useEffect, useCallback, useReducer } from "react";
import axios from "axios";
import "../reservations/reservations.css";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";


function Reservations() {
  let token = sessionStorage.getItem("token");
  const [reservation, setReservation] = useState([]);
  const navigate = useNavigate();

  const userRole = sessionStorage.getItem("userType");

  console.log(userRole === "user")
  useEffect(() => {
    if(!sessionStorage.getItem("token") || userRole == "user")
    navigate("/login");
  }, [])

  
  const getreservations = async () => {
    try {
      const response = await axios.get(
        "https://flower-shop.onrender.com/res/reservations"
      );
      setReservation(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getreservations();
  }, []);

  const config1 = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  //delete item
  const deleteRes = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this reservation!",
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
        await axios.delete(`https://flower-shop.onrender.com/res/reservations/${id}`, config1);
        getreservations();
        swal("Poof! The reservation has been deleted!", {
          icon: "success",
        });
      } else {
        swal("The item is safe!");
      }
    });
  };

  return (
    <div className="tbl-wrper-res">
      <table className="table-res">
        <thead>
          <tr className="first-res--">
            <th>UserID</th>
            <th>Full Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Date</th>
            <th>Address</th>
            <th>Description</th>
            <th>Tools</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(reservation) &&
            reservation.map((res, index) => {
              return (
                <tr className="" key={index}>
                  <td className="res-name"> {res.userId} </td>
                  <td className="res-name"> {res.name} </td>
                  <td className="res-name">
                    <Link to={`https://wa.me/${res.phone_nb}`} target="_blank">
                      {res.phone_nb}
                    </Link>
                  </td>

                  <td className="res-name"> {res.email} </td>
                  <td className="res-name"> {res.date} </td>
                  <td className="res-name"> {res.address} </td>
                  <td className="res-name"> {res.message} </td>
                  <td>
                    <ul className="tools-list">
                      {res.tools.map((tool, i) => (
                        <li key={i}>{tool}</li>
                      ))}
                    </ul>
                  </td>

                  <td>
                    <button
                      alt=""
                      className="button-delete-res"
                      onClick={() => deleteRes(res._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default Reservations;
