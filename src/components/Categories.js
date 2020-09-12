import React, { useState, useEffect } from "react";
// import Feed from "../containers/Feed";
import SubCategories from "./SubCategories";

const Categories = () => {
  const [instruments, setInstruments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [lastInstrument, setLastInstrument] = useState('');

  //helper functions
  const toggleButton = (e) => {
    if (e.target.innerHTML === "+") {
      e.target.innerHTML = "-"
    } else {
      e.target.innerHTML = "+"
    }
  }

  const resetOtherButton = () => {
    if (lastInstrument) {
      lastInstrument.innerHTML = '+'
    } 
  }

  //can we use a set instead?
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
    //add info for this instrument
    setCategories([...categories, ...array]);
    //set the last instrument to this current instrument
    setLastInstrument(e.target)
  };
//make categories an empty array...
  const removeCategory = (e) => {
    setCategories([])  
    setLastInstrument('')
  };

  const clickHandler = (e) => {
    if (e.target.innerHTML === "+") {
      resetOtherButton()
      removeCategory()
      addCategory(e)
      toggleButton(e)
    } else {
      removeCategory()
      toggleButton(e)
    }
  };

  useEffect(() => {
    fetch("/api/instruments")
      .then((data) => data.json())
      .then((data) => setInstruments(data.payload));
  }, []);

  let categoryArray = instruments.map((cat) => cat.category);
  categoryArray = categoryArray
  //how does this work?
    .filter((a, b) => categoryArray.indexOf(a) === b)
    .map((tag, index) => {
      return (
        <li className="category" key={`category${index}`}>
          <button
            type="button"
            className="categoryButton"
            value={tag}
            onClick={clickHandler}
            on="false"
          >
            +
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
 