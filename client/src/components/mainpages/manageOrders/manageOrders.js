import React from "react";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import swal from "sweetalert";
import { GlobalState } from "../../../GlobalState";

export default function manageOrders() {
  const state = useContext(GlobalState);
  const [orders, setOrders] = useState([]);
  const [crrUser, setCrrUser] = state.userAPI.user;

  useEffect(() => {
    const getOrders = async () => {
      const res = await axios.get(`/api/order/${crrUser._id}`);
      setOrders(res.data);
    };
    getOrders();
  }, []);

  console.log(orders);
  return (
    <div>
      <h1>Manage Orders</h1>
    </div>
  );
}
