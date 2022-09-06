import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";
import Loading from "../utils/loading/Loading";
import { useHistory, useParams } from "react-router-dom";

const initialState = {
  book_id: "",
  title: "",
  author: "",
  price: 0,
  description: "",
  content: "",
  category: "",
  _id: "",
};

function CreateBook() {
  const state = useContext(GlobalState);
  const [book, setBook] = useState(initialState);
  const [categories] = state.categoriesAPI.categories;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user] = state.userAPI.user;
  const [isAdmin] = state.userAPI.isAdmin;
  const [isSeller] = state.userAPI.isSeller;
  const [token] = state.token;

  const history = useHistory();
  const param = useParams();

  const [books] = state.booksAPI.books;
  const [onEdit, setOnEdit] = useState(false);
  const [callback, setCallback] = state.booksAPI.callback;

  console.log(books);
  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      books.forEach((book) => {
        if (book._id === param.id) {
          setBook(book);
          setImages(book.images);
        }
      });
    } else {
      setOnEdit(false);
      setBook(initialState);
      setImages(false);
    }
  }, [param.id, books]);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!(isAdmin || isSeller)) return alert("You're not an admin or seller");
      const file = e.target.files[0];

      if (!file) return alert("File not exist.");

      if (file.size > 1024 * 1024)
        // 1mb
        return alert("Size too large!");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        // 1mb
        return alert("File format is incorrect.");

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setLoading(false);
      setImages(res.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleDestroy = async () => {
    try {
      if (!(isAdmin || isSeller)) return alert("You're not an admin or seller");
      setLoading(true);
      await axios.post(
        "/api/destroy",
        { public_id: images.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setImages(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!(isAdmin || isSeller)) return alert("You're not an admin or seller");
      if (!images) return alert("No Image Upload");

      if (onEdit) {
        await axios.put(
          `/api/book/${book._id}`,
          { ...book, images },
          {
            headers: { Authorization: token },
          }
        );
      } else {
        await axios.post(
          "/api/book",
          { ...book, seller_id: user._id, images },
          {
            headers: { Authorization: token },
          }
        );
      }
      setCallback(!callback);
      history.push("/");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const styleUpload = {
    display: images ? "block" : "none",
  };
  return (
    <div>
      <center>
        <h3 className="register-heading1">
          {onEdit ? "Update Book" : "Add New Book"}
        </h3>
      </center>
      <div className="create_book">
        <div className="border">
          {/* <hr className="hr11" /> */}

          <br />
          <div className="upload">
            <br />
            <input
              type="file"
              name="file"
              id="file_up"
              onChange={handleUpload}
            />
            {loading ? (
              <div id="file_img">
                <Loading />
              </div>
            ) : (
              <div id="file_img" style={styleUpload}>
                <img src={images ? images.url : ""} alt="" />
                <span onClick={handleDestroy}>X</span>book_id
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-4">
                <label htmlFor="book_id">Book ID</label>
                <input
                  type="text"
                  name="book_id"
                  className="form-control form-control-lg"
                  id="book_id"
                  required
                  value={book.book_id}
                  onChange={handleChangeInput}
                  disabled={onEdit}
                />
              </div>
              <div className="col-md-6 mb-4">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control form-control-lg"
                  id="title"
                  required
                  value={book.title}
                  onChange={handleChangeInput}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-4">
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  name="author"
                  className="form-control form-control-lg"
                  id="author"
                  required
                  value={book.author}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="col-md-6 mb-4">
                <label htmlFor="price">Price (LKR)</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="form-control form-control-lg"
                  required
                  value={book.price}
                  onChange={handleChangeInput}
                />
              </div>
            </div>

            <div className="row">
              <label htmlFor="description">Description</label>
              <textarea
                type="text"
                name="description"
                id="description"
                className="form-control form-control-lg"
                required
                value={book.description}
                rows="5"
                onChange={handleChangeInput}
              />
            </div>

            <div className="row">
              <label htmlFor="content">Content</label>
              <textarea
                type="text"
                name="content"
                id="content"
                className="form-control form-control-lg"
                required
                value={book.content}
                rows="7"
                onChange={handleChangeInput}
              />
            </div>

            <div className="rowCat">
              <label htmlFor="categories">Categories: </label>
              <br />
              <select
                className="form-select"
                id="inlineFormCustomSelectPref"
                name="category"
                value={book.category}
                onChange={handleChangeInput}
              >
                <option value="">Please select a category</option>
                {categories.map((category) => (
                  <option value={category._id} key={category._id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>

            <button className="mt-5 mb-5" type="submit">
              {onEdit ? "Update" : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateBook;
