import React, { useState, useEffect, useRef } from "react";
import Feed from "../containers/Feed";
import subCategories from "./SubCategories";
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
    // console.log(categories);
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
          <button type="button" value={tag} onClick={addCategory}>
            -
          </button>
          {tag}
        </li>
      );
    });

  return (
    <>
      <ul className="instrumentCategories">{categoryArray}</ul>
      <div>
        <SubCategories categories={categories} />
      </div>
    </>
  );
};

export default Categories;
