import React, { useState, useEffect } from "react";

const FeedBox = (props) => {
  const { items } = props;
  
  const [checkoutArray, addToArray] = useState([]);
  const [cache, updateCache] = useState({});
  const [addDetail, setAddDetail] = useState("");

  const itemArray = items.map((item, index) => {
    const available = item.isCheckedOut ? "Checked Out!" : "Available";
    return (
      <>
        <li className="firstLine" key={`item${index}`}>
          {item.color} {item.make} {item.model}{" "}
          {item.isCheckedOut ? "Checked Out!" : "Available"}
        </li>{" "}
        Details on condition{" "}
        <textarea
          placeholder="Write description here"
          className="detailTextBox"
          onChange={(e) => {
            e.persist();
            console.log("in text area checking e target   ", e.target.value);
            setAddDetail(e.target.value);
          }}
        />
        <button
          className="addToCheckoutList"
          onClick={() => {
            if (!item.isCheckedOut && !cache[item.id]) {
              updateCache({ ...cache, [item.id]: true });
              addToArray([
                ...checkoutArray,
                <div className="hello">
                <li className="firstLine" key={item.id}>
                  {item.color} {item.make} {item.model}{" "}
                  <p className="appendDetailText">
                    <b>NOTES</b>
                    <p></p>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{addDetail}
                  </p>
                </li>
                </div>,
              ]);
            }
          }}
        >
          Add to Checkout List
        </button>
      </>
    );
  });

  useEffect(() => {
    fetch("/api/logs")
      .then((data) => data.json())
      /*.then((data) => console.log(data.payload));*/
  }, []);

  return (
    <>
      <div className="feedBox">
        <ul>{itemArray}</ul>
        <div className="innerFeedBox">
        <ul>{checkoutArray}</ul>
        </div>     
      </div>
    </>
  );
};

export default FeedBox;

{
  /* <Checkout items={items} /> */
}
