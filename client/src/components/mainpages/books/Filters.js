import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";

function Filters() {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;

  const [category, setCategory] = state.booksAPI.category;
  const [sort, setSort] = state.booksAPI.sort;
  const [search, setSearch] = state.booksAPI.search;

  const handleCategory = (e) => {
    setCategory(e.target.value);
    setSearch("");
  };
  return (
    <div className="filter_menu">
      <div className="row">
        <span>
          <b>Filter by Category </b>
        </span>
        <select name="category" value={category} onChange={handleCategory}>
          <option value="">All Books</option>
          {categories.map((category) => (
            <option value={"category=" + category._id} key={category._id}>
              {category.categoryName}
            </option>
          ))}
        </select>
      </div>
      <div className="row">
        <span>
          <b>Search Your Favorite Book...</b>{" "}
        </span>
        <input
          type="text"
          value={search}
          placeholder="Enter your search!"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      </div>
      <div className="row sort">
        <span><b>Sort By </b></span>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Recent</option>
          <option value="sort=-price">Price(Hight to Low)</option>
          <option value="sort=price">Price(Low to Hight)</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
