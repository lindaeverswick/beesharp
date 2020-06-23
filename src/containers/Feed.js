import React, { useState, useEffect, useRef } from "react";
import FeedBox from "../components/FeedBox";

const Feed = (props) => {
  const { items } = props;
  const itemArray = items.map((item, index) => {
    return (
      <div className="feedBox" key={`item${index}`}>
        {item.color} {item.make} {item.model}
      </div>
    );
  });

  return <>{itemArray}</>;
};

export default Feed;
