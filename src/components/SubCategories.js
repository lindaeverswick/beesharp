import React, { useState, useEffect, useRef } from "react";
import Feed from "../containers/Feed";

const SubCategories = (props) => {
  const [items, setItems] = useState([]);
  const { categories } = props;

  const handleClick = (e) => {
    console.log(e.target.value);
    const array = [];
    categories.forEach((cat) => {
      if (
        cat.make === e.target.value ||
        cat.model === e.target.value ||
        cat.color === e.target.value
      ) {
        array.push(cat);
      }
    });
    setItems([...items, ...array]);
  };

  useEffect(() => {
    console.log(items);
  });

  let makeArray = categories.map((sub) => sub.make);
  makeArray = makeArray
    .filter((a, b) => makeArray.indexOf(a) === b)
    .map((sub, index) => {
      return (
        <li className="category" key={`make${index}`}>
          <button type="button" value={sub} onClick={handleClick}>
            -
          </button>
          {sub}
        </li>
      );
    });

  let modelArray = categories.map((sub) => sub.model);
  modelArray = modelArray
    .filter((a, b) => modelArray.indexOf(a) === b)
    .map((sub, index) => {
      return (
        <li className="category" key={`model${index}`}>
          <button type="button" value={sub} onClick={handleClick}>
            -
          </button>
          {sub}
        </li>
      );
    });

  let colorArray = categories.map((sub) => sub.color);
  colorArray = colorArray
    .filter((a, b) => colorArray.indexOf(a) === b)
    .map((sub, index) => {
      return (
        <li className="category" key={`model${index}`}>
          <button type="button" value={sub} onClick={handleClick}>
            -
          </button>
          {sub}
        </li>
      );
    });

  return (
    <>
      <ul className="makeCategories">
        <li>Make</li>
        {makeArray}
      </ul>
      <ul className="modelCategories">
        <li>Model</li>
        {modelArray}
      </ul>
      <ul className="colorCategories">
        <li>Color</li>
        {colorArray}
      </ul>
      <Feed items={items} />
    </>
  );
};

export default SubCategories;
