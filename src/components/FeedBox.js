import React, { useState, useEffect, useRef } from "react";

const FeedBox = (props) => {
  const { items } = props;

  const itemArray = items.map((item, index) => {
    const available = item.isCheckedOut ? "Checked Out!" : "Available";
    return (
      <li className="firstLine" key={`item${index}`}>
        {item.color} {item.make} {item.model}{" "}
        {item.isCheckedOut ? "Checked Out!" : "Available"}
      </li>
    );
  });

  useEffect(() => {
    fetch("/api/logs")
      .then((data) => data.json())
      .then((data) => console.log(data.payload));
  }, []);

  return (
    <>
      <div className="feedBox">
        <ul>{itemArray}</ul>
      </div>
    </>
  );
};

export default FeedBox;
