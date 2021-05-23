import React from "react";
import "./Card.css";

const Card = ({ title, description, link }) => {
  return (
    <div className="card-body">
      <h5 className="card-title">{title}</h5>
      <div className="card-text">
        <p>{description}</p>
        <a href={link} className="link">
          {link}
        </a>
      </div>
    </div>
  );
};

export default Card;
