import React, { useState, useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import "./Styles/categories.css";
import axios from "axios";
import swal from "sweetalert";

function Categories() {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [token] = state.token;
  const [callback, setCallback] = state.categoriesAPI.callback;

  const [category, setCategory] = useState({
    categoryName: "",
    date: "",
    description: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const createCategory = async (e) => {
    e.preventDefault();
    console.log(category);
    try {
      const res = await axios.post(
        "/api/category",
        { ...category },
        {
          headers: { Authorization: token },
        }
      );
      swal(res.data.msg, {
        icon: "success",
      });
      setCategory("");
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="categoryTop">
      <div className="container-fluid ps-md-0 ">
        <div className="row g-0">
          <div className="d-none d-md-flex col-md-4 col-lg-6 categoryimage"></div>
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-5">
              <div className="card-body p-md-5 text-black">
                <h3 className="category-heading mb-6">Add New Book Category</h3>
                <hr className="hr1" />
                <br />
                <div className="borderCat">
                  <form onSubmit={createCategory}>
                    <div className="ms-4 col-md-6 mb-4 mt-5">
                      <div className="form-outline">
                        <label className="form-label" for="form3Example1m">
                          <b>Category Name</b>
                        </label>
                        <input
                          type="text"
                          name="categoryName"
                          placeholder="E.g.: History"
                          value={category.categoryName}
                          className="form-control form-control-lg"
                          onChange={onChangeInput}
                          required
                        />
                      </div>
                    </div>
                    <div className="ms-4 col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label" for="form3Example1m">
                          <b>Date</b>
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={category.date}
                          className="form-control form-control-lg"
                          onChange={onChangeInput}
                          required
                        />
                      </div>
                    </div>
                    <div className="ms-4 col-md-6 mb-4 w-75">
                      <div className="form-outline">
                        <label className="form-label" for="form3Example1m">
                          <b>Description</b>
                        </label>
                        <textarea
                          style={{ height: "120px" }}
                          type="text"
                          name="description"
                          placeholder="E.g.:- History category lay out the known facts about a particular, time, culture, or event in history. "
                          value={category.description}
                          className="form-control form-control-lg"
                          onChange={onChangeInput}
                          required
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-center pt-3">
                      <button className="buttonCat mb-5" type="submit">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
