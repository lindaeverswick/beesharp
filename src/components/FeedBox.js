import React, { useState, useEffect, useRef } from "react";

const FeedBox = (props) => {
  const { items } = props;
  const itemArray = items.map((item) => {
    return (
      <li>
        {item.color} {item.make} {item.model}
      </li>
    );
  });
  return (
    <>
      <h1>FEEDBOX IS HERE</h1>
      <div className="feedBox">
        <ul className="firstLine">{itemArray}</ul>
      </div>
    </>
  );
};

export default FeedBox;
