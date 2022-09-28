import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import swal from "sweetalert";
import "./displayOrders.css";

export default function DisplayOrders() {
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

  const setData = (id, orderstatus) => {
    const value = {
      orderstatus,
    };

    axios.put(`http://localhost:5000/api/order/${id}`, value).then((res) => {
      window.location.reload(false);
      swal({
        title: ` Order is ${orderstatus}`,
        icon: "success",
        button: "OK",
      }).catch((err) => {
        swal({
          title: "Error",
          text: err.response.data.msg,
          icon: "error",
          button: "OK",
        });
      });
    });
  };

  return (
    <div>
      <div className="dIsTopicNam">Customer Orders</div>
      <hr className="disTopicHr" />
      <table className="table frame">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Phone</th>
            <th scope="col">Order</th>
            <th scope="col">Order Status</th>

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
                  <div className="disDetailsOrder" key={item._id}>
                    <h6 className="DisHOrder">Book : {item.title}</h6>
                    <div className="DisHItems">
                      {" "}
                      Price of Book (unique): {item.price}
                      <br />
                      Number of Books(Qty) :{item.quantity}
                    </div>
                  </div>
                ))}
              </td>
              <td className="DisStat">{data.orderstatus}</td>
              <td>
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
