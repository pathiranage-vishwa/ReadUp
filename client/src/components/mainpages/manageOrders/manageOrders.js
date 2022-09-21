import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import swal from "sweetalert";

export default function ManageOrders() {
  const state = useContext(GlobalState);
  const [orders, setOrders] = useState([]);
  const [crrUser, setCrrUser] = state.userAPI.user;

  useEffect(() => {
    const getOrders = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/order/${crrUser._id}`
      );
      setOrders(res.data);
    };
    getOrders();
  }, [crrUser]);

  console.log(orders);
  return (
    <div>
      <h1>Manage Orders</h1>

      {orders.map((order) => (
        <div key={order._id}>
          {" "}
          {order._id}
          <br />
          {order.name}
          <br />
          {order.address}
          <br />
          {order.cart.map((item) => (
            <div key={item._id}>
              {item.title}
              <br />
              {item.price}
              <br />
              {item.quantity}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
