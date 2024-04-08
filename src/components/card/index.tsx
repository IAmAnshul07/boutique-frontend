import React from "react";

const Card = ({ product }) => {
  const { name, price, currency, image } = product;

  return (
    <div className="card border-2 w-60 md:w-80 h-96">
      <figure>
        <img src={image[0]} alt={name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>
          {currency} {price}
        </p>
        <div className="card-actions justify-center">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
