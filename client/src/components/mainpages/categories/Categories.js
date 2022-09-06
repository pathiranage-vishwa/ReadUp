import React, { useState, useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import "./Styles/categories.css";
import axios from "axios";

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
      alert(res.data.msg);
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
                <form onSubmit={createCategory}>
                  <h3 className="category-heading mb-6">Create Category</h3>
                  <hr className="hr1" />
                  <br />
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label" for="form3Example1m">
                        Category Name
                      </label>
                      <input
                        type="text"
                        name="categoryName"
                        value={category.categoryName}
                        className="form-control form-control-lg"
                        onChange={onChangeInput}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label" for="form3Example1m">
                        Date
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
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label" for="form3Example1m">
                        Description
                      </label>
                      <input
                        type="text"
                        name="description"
                        value={category.description}
                        className="form-control form-control-lg"
                        onChange={onChangeInput}
                        required
                      />
                    </div>
                  </div>

                  <div className="d-flex justify-content-end pt-3">
                    <button
                      className="btn btn-lg btn-success btn-login text-uppercase fw-bold mb-5"
                      type="submit"
                      style={{ height: "50px" }}
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
