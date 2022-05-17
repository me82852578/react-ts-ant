import React from "react";

interface Props {
  price: number;
  comparedPrice: number;
}

const PriceCell = ({ price, comparedPrice }: Props) => {
  let priceStyle = {
    color: "",
    backgroundColor: "",
  };
  if (price >= comparedPrice * 1.2) {
    priceStyle = { color: "red", backgroundColor: "rgb(255, 235, 235)" };
  } else if (price <= comparedPrice * 0.8) {
    priceStyle = {
      color: "green",
      backgroundColor: "rgb(235, 255, 235)",
    };
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        height: "100%",
        width: "100%",
        top: "0px",
        left: "0px",
        ...priceStyle,
      }}
    >
      {price}
    </div>
  );
};

export default PriceCell;
