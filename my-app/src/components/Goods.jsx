import React from "react";

const Goods = ({ goods, loading }) => {
  if (loading) {
    return <h1> Loading... </h1>;
  }

  return (
    <ul>
      {goods.map((item, index) => {
        <li>{item.id}</li>;
      })}
    </ul>
  );
};

export default Goods;
