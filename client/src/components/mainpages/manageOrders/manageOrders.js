import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import swal from "sweetalert";
import "./manageOrders.css";

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
      <div className="topicNam">Customer Orders</div>
      <hr className="topicHr" />
      <table className="table frame">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Phone</th>
            <th scope="col">Order</th>

            <th scope="col">
              <center>Action</center>
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((data, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{data.name}</td>

              <td>{data.address}</td>
              <td>{data.phoneNumber}</td>
              <td>
                {data.cart.map((item) => (
                  <div key={item._id}>
                    {item.title}
                    <br />
                    {item.price}
                    <br />
                    {item.quantity}
                  </div>
                ))}
              </td>
              {/* <td>
                <b className="statusUp">{data.topicStatus}</b>
              </td> */}
              <td>
                <button
                  className="btn btn btn_edit "
                  // disabled={
                  //   data.topicStatus === "Accepted" ||
                  //   data.topicStatus === "Rejected"
                  // }
                  //  onClick={() => setData(data)}
                >
                  &nbsp;Accept
                </button>
                <button
                  // disabled={
                  //   data.topicStatus === "pending" ||
                  //   data.topicStatus === "Rejected"
                  // }
                  // onClick={() => setDocument(data)}
                  className="btn btn-danger ms-3 btn_delete"
                >
                  &nbsp;Reject
                </button>
                &nbsp;&nbsp;&nbsp;
                {/* {crrUser.role === "Panel_Member" ? (
                  <button
                    class="btn btn-info"
                    disabled={
                      data.topicStatus === "pending" ||
                      data.topicStatus === "Rejected" ||
                      data.topicDocument === "pending"
                    }
                    onClick={() => setEvaluate(data)}
                  >
                    &nbsp;Evaluate
                  </button>
                ) : (
                  " "
                )} */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
