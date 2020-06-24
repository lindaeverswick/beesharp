import React, { useState, useEffect, useRef } from "react";
import FeedBox from "../components/FeedBox";

const Feed = (props) => {
  const { items } = props;
  return (
    <>
      <FeedBox items={items} />
    </>
  );
};

export default Feed;
