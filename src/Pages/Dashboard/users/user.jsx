import React, { useState, useEffect, useCallback, useReducer } from "react";
import axios from "axios";
import "../reservations/reservations.css";
import { useNavigate } from "react-router";

function Users() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();


  const userRole = sessionStorage.getItem("userType");

  console.log(userRole === "user")
  useEffect(() => {
    if(!sessionStorage.getItem("token") || userRole == "user")
    navigate("/login");
  }, [])


  const getusers = async () => {
    try {
      const response = await axios.get("https://flower-shop.onrender.com/user/get");
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getusers();
  }, []);

  return (
    <div className="tbl-wrper-res">
      <table className="table-res">
        <thead>
          <tr className="first-res--">
            <th>UserID</th>
            <th>User Name</th>
            <th>Email</th>
            <th>User Type</th>
          </tr>
          
        </thead>
        <tbody>
          {Array.isArray(user) &&
            user.map((res, index) => {
              return (
                <tr className="" key={index}>
                  <td className="res-name"> {res._id} </td>
                  <td className="res-name"> {res.name} </td>

                  <td className="res-name"> {res.email} </td>
                  <td className="res-name"> {res.userType} </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
