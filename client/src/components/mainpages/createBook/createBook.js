import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";
import Loading from "../utils/loading/Loading";
import { useHistory, useParams } from "react-router-dom";
import swal from "sweetalert";

const initialState = {
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
      if (!(isAdmin || isSeller))
        return swal("You're not an admin or seller", {
          icon: "warning",
        });
      const file = e.target.files[0];

      if (!file)
        return swal("File not exist.", {
          icon: "warning",
        });

      if (file.size > 1024 * 1024)
        // 1mb
        return swal("Size too large!", {
          icon: "warning",
        });

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        // 1mb
        return swal("File format is incorrect.", {
          icon: "warning",
        });

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
      if (!(isAdmin || isSeller))
        return alert("You're not an admin or seller", {
          icon: "warning",
        });
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
      if (!(isAdmin || isSeller))
        return swal("You're not an admin or seller", {
          icon: "warning",
        });
      if (!images)
        return swal("No Image Upload", {
          icon: "warning",
        });

      if (onEdit) {
        swal({
          title: "Are you sure?",
          text: "if may affect other book details",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willUpdate) => {
          if (willUpdate) {
            axios.put(
              `/api/book/${book._id}`,
              { ...book, images },
              {
                headers: { Authorization: token },
              }
            );
            swal("Book is update successfully !", {
              icon: "success",
            });
            window.location.reload(false);
          } else {
            swal("Update process canceled!");
          }
        });
      } else {
        await axios.post(
          "/api/book",
          { ...book, seller_id: user._id, images },
          {
            headers: { Authorization: token },
          }
        );
        swal("Done!", " Book Added Successfully", "success");
      }
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const styleUpload = {
    display: images ? "block" : "none",
  };
  return (
    <div>
      <center className="header21">
        <h2 className="BookHeading1">
          {onEdit ? "Edit Book Details" : "Add New Book"}
        </h2>
      </center>
      <div className="create_book">
        <div className="borderAdd">
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
                <span onClick={handleDestroy}>X</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-4">
                <label htmlFor="title">
                  {" "}
                  <b>Book Title</b>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="E.g.:- Harry Potter"
                  className="form-control form-control-lg"
                  id="title"
                  required
                  value={book.title}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="col-md-6 mb-4">
                <div className="rowCat">
                  <label htmlFor="categories">
                    <b>Categories:</b>{" "}
                  </label>
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
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-4">
                <label htmlFor="author">
                  <b>Author</b>
                </label>
                <input
                  type="text"
                  name="author"
                  placeholder="E.g.:-Mr: J.K Rowling"
                  className="form-control form-control-lg"
                  id="author"
                  required
                  value={book.author}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="col-md-6 mb-4">
                <label htmlFor="price">
                  {" "}
                  <b>Price (LKR)</b>
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="E.g.:- 1000.00"
                  id="price"
                  className="form-control form-control-lg"
                  required
                  value={book.price}
                  onChange={handleChangeInput}
                />
              </div>
            </div>

            <div className="row">
              <label htmlFor="description">
                <b>Description</b>
              </label>
              <textarea
                type="text"
                name="description"
                placeholder="E.g.:- Harry Potter is a series of fantasy novels."
                id="description"
                className="form-control form-control-lg"
                required
                value={book.description}
                rows="5"
                onChange={handleChangeInput}
              />
            </div>

            <div className="row">
              <label htmlFor="content">
                <b>Content</b>
              </label>
              <textarea
                type="text"
                name="content"
                id="content"
                placeholder="E.g.:- The novels chronicle the life of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry."
                className="form-control form-control-lg"
                required
                value={book.content}
                rows="7"
                onChange={handleChangeInput}
              />
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
