import React, { useState, useEffect, useRef } from "react";
import Feed from "../containers/Feed";
import SubCategories from "./SubCategories";

const Categories = () => {
  const [instruments, setInstruments] = useState([]);
  const [categories, setCategories] = useState([]);

  const addCategory = (e) => {
    const array = [];
    instruments.forEach((obj) => {
      if (obj.category === e.target.value) {
        array.push(obj);
      }
    });

    for (let i = 0; i < categories.length; i++) {
      for (let j = 0; j < array.length; j++) {
        if (
          categories[i].model === array[j].model &&
          categories[i].make === array[j].make
        ) {
          array.splice(j, 1);
        }
      }
    }
    setCategories([...categories, ...array]);
  };

  const removeCategory = (e) => {
    console.log("trying to remove");
    categories.forEach((obj, index) => {
      if (obj.category === e.target.value) {
        console.log(e.target.value);
        setCategories((cat) => cat.splice(index, 1));
      }
    });
  };

  const toggle = (e) => {
    // console.log(e.target.innerHTML);
    if (e.target.innerHTML === "-") {
      e.target.innerHTML = "x";
      addCategory(e);
    } else {
      e.target.innerHTML = "-";
      removeCategory(e);
    }
  };

  useEffect(() => {
    fetch("/api/instruments")
      .then((data) => data.json())
      .then((data) => setInstruments(data.payload));
  }, []);

  let categoryArray = instruments.map((cat) => cat.category);
  categoryArray = categoryArray
    .filter((a, b) => categoryArray.indexOf(a) === b)
    .map((tag, index) => {
      return (
        <li className="category" key={`category${index}`}>
          <button
            type="button"
            className="categoryButton"
            value={tag}
            onClick={toggle}
            on="false"
          >
            -
          </button>
          {tag}
        </li>
      );
    });

  return (
    <div className="categories">
      <ul className="instrumentCategories">{categoryArray}</ul>
      <div>
        <SubCategories categories={categories} />
      </div>
    </div>
  );
};

export default Categories;
