import React, { useState, useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import "./Styles/allCategory.css";
import swal from "sweetalert";

function Categories() {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [categoryName, setCategoryName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [token] = state.token;
  const [callback, setCallback] = state.categoriesAPI.callback;
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState("");

  const createCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `/api/category/${id}`,
        { categoryName: categoryName, date: date, description: description },
        {
          headers: { Authorization: token },
        }
      );
      swal(res.data.msg);
      setOnEdit(false);
      setCategoryName("");
      setCallback(!callback);
    } catch (err) {
      swal(err.response.data.msg);
    }
  };

  const editCategory = async (id, categoryName) => {
    setID(id);
    setCategoryName(categoryName);
    setOnEdit(true);
  };

  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(`/api/category/${id}`, {
        headers: { Authorization: token },
      });
      swal(res.data.msg);
      setCallback(!callback);
    } catch (err) {
      swal(err.response.data.msg);
    }
  };

  return (
    <div className="categories1">
      <div className="border">
        <form onSubmit={createCategory}>
          <h3 className="category-heading mb-6 ms-3">Update Category</h3>
          <hr className="hr1 ms-3" />
          <br />
          <div>
            <div className="form-outline">
              <label className="form-label" for="form3Example1m">
                Category Name
              </label>
              <input
                type="text"
                name="categoryName"
                value={categoryName}
                className="form-control form-control-lg"
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
            </div>
          </div>
          {/* <div className="col-md-6 mb-4">
            <div className="form-outline">
              <label className="form-label" for="form3Example1m">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={date}
                className="form-control form-control-lg"
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div> */}
          {/* <div className="col-md-6 mb-4">
            <div className="form-outline">
              <label className="form-label" for="form3Example1m">
                Description
              </label>
              <input
                type="text"
                name="description"
                value={description}
                className="form-control form-control-lg"
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div> */}

          <div>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
      <div className="col">
        <div className="DisplayMain">
          <label className="formTitleMark"> ALL CATEGORIES</label>
          <hr className="hr1" />
          <div>
            <table className="table" style={{ backgroundColor: "white" }}>
              <thead>
                <tr>
                  <th scope="col">Index</th>
                  <th scope="col">Category Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{category.categoryName}</td>
                    <td>
                      <button
                        className="btn_edit"
                        onClick={() =>
                          editCategory(
                            category._id,
                            category.categoryName,
                            category.date,
                            category.description
                          )
                        }
                      >
                        Update
                      </button>
                      <button
                        className=" btn btn-danger btn_delete"
                        onClick={() => deleteCategory(category._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
