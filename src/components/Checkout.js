import React, { useState, useEffect, useRef } from "react";

const Checkout = (props) => {
  const { items } = props;
  const itemArray = items.map((item, index) => {
    const available = item.isCheckedOut ? "Checked Out!" : "Available";
    return (
      <li className="firstLine" key={`item${index}`}>
        {item.color} {item.make} {item.model} {available}
      </li>
    );
  });
  return (
    <>
      <h1>CHECKOUT IS HERE</h1>
      <div className="checkout">
        <ul></ul>
        <button>Checkout</button>
      </div>
    </>
  );

}

export default Checkout;
