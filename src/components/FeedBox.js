import React, { useState, useEffect, useRef } from "react";

const FeedBox = (props) => {
  const { items } = props;
  const itemArray = items.map((item, index) => {
    const available = item.isCheckedOut ? "Checked Out!" : "Available";
    return (
      <li className="firstLine" key={`item${index}`}>
        {item.color} {item.make} {item.model} {available}
      </li>
    );
  });

  const get = () => {
    fetch("/api/logs", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <>
      <h1>FEEDBOX IS HERE</h1>
      <div className="feedBox">
        <ul>{itemArray}</ul>
      </div>
      <button onClick={get}></button>
    </>
  );
};

export default FeedBox;
