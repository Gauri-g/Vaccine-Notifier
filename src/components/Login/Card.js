import "bootstrap/dist/css/bootstrap.css";
import "./Card.css";

const Card = ({ title, description, link }) => {
  return (
    <>
      {/* <div className="card" > */}
        <div className="card-body col-lg-4 col-xs-8 col-md-4">
          <div><h5 className="card-title">H6 - Website Name</h5>
          <div className="card-text">
            <p>Meta description of the website in about two lines in this card. If it exceeds two lines then terminate with period. Let’s use word count.</p>
            <a href="/#" className="link">Link</a>
          </div>
          </div>
        </div>
      {/* </div> */}
    </>
  );
};

export default Card;
