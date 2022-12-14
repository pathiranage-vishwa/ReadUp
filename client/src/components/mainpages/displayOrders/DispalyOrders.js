import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import "./displayOrders.css";
import moment from "moment";
import BuyerReport from "./BuyerReport";

export default function DisplayOrders() {
  const state = useContext(GlobalState);
  const [orders, setOrders] = useState([]);
  const [crrUser, setCrrUser] = state.userAPI.user;

  useEffect(() => {
    const getOrders = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/orderGet/${crrUser._id}`
      );
      setOrders(res.data);
    };
    getOrders();
  }, [crrUser]);

  const filterData = (orders, searchkey) => {
    const result = orders.filter(
      (orders) =>
        orders.total.includes(searchkey) ||
        orders.orderstatus.includes(searchkey) ||
        orders.createdAt.includes(searchkey)
    );
    setOrders(result);
  };

  function hancdleSearchArea(e) {
    const searchkey = e.currentTarget.value;

    // axios.get(`http://localhost:5000/api/orderGet/${crrUser._id}`).then((res) => {
    //   if (res.data.success) {
    filterData(orders, searchkey);
    //   }
    // });
  }

  return (
    <div>
      <div className="dIsTopicNam">My Orders</div>
      <hr className="disTopicHr" />
      <div className="row" style={{ width: "20%" }}>
        <h4> Search here </h4>
        <div className="col-lg-12  mt-2 mb-2" style={{ marginLeft: "5%" }}>
          <input
            className="form-control"
            type="search"
            placeholder="search...(Date,time,total,status)"
            name="search"
            onChange={hancdleSearchArea}
          ></input>
        </div>
      </div>
      <div className="buyerReport">
        <button
          className="btn btn_report_buyer  ms-3"
          onClick={() => BuyerReport(orders, crrUser.firstName)}
        >
          Buyer Report
        </button>
      </div>
      <table className="table frame">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Book Details</th>
            <th scope="col">Amount</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((data, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
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
              <td>Rs.{data.total}</td>
              <td>{moment(data.createdAt).utc().format("YYYY-MM-DD")}</td>
              <td>{moment(data.createdAt).utc().format("HH:MM:SS")}</td>
              <td className="DisStat">{data.orderstatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
