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

  useEffect(() => {
    fetch("/api/logs", {
      method: "GET",
    }).then((data) => console.log(data));
  });

  return (
    <>
      <h1>FEEDBOX IS HERE</h1>
      <div className="feedBox">
        <ul>{itemArray}</ul>
      </div>
    </>
  );
};

export default FeedBox;
