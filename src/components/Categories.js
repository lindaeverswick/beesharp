import React, { useState, useEffect, useRef } from "react";
import Feed from "./Feed";

const Categories = () => {
  const [category, setCategory] = useState("");
  const [items, setItems] = useState({
    pianos: [{}],
  });
  const handleChange = (e) => {
    setCategory(e.target.value);
  };
  const addCategory = (e) => {
    setCategory("");
  };
  return (
    <>
      <input
        id="category"
        type="text"
        placeholder="enter category"
        value={category}
        onChange={handleChange}
        required
      />
      <button type="button" onClick={addCategory}>
        Add
      </button>
      <div className="categoryList">
        <ul>
          <li>asdf</li>
        </ul>
      </div>
    </>
  );
};

export default Categories;
