import { useState, useEffect } from "react";
import axios from "axios";

function BookAPI() {
  const [books, setBooks] = useState([]);
  const [callback, setCallback] = useState(false);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);

  useEffect(() => {
    const getbooks = async () => {
      const res = await axios.get(
        `/api/book?limit=${page * 9}&${category}&${sort}&title[regex]=${search}`
      );
      setBooks(res.data.Books);
      setResult(res.data.result);
    };
    getbooks();
  }, [callback, category, sort, search, page]);

  return {
    books: [books, setBooks],
    callback: [callback, setCallback],
    category: [category, setCategory],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],
  };
}

export default BookAPI;
