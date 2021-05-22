import "bootstrap/dist/css/bootstrap.css";
import "./Card.css";

const Card = ({ title, description, link }) => {
  return (
    <>
      {/* <div className="card" > */}
        <div className="card-body col-lg-4 col-xs-8 col-md-4">
          <div><h5 className="card-title">{title}</h5>
          <div className="card-text">
            <p>{description}</p>
            <a href={link} className="link">Link</a>
          </div>
          </div>
        </div>
      {/* </div> */}
    </>
  );
};

export default Card;
