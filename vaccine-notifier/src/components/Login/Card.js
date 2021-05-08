import "bootstrap/dist/css/bootstrap.css";
import "./Card.css";

const Card = () => {
  return (
    <>
      {/* <div class="card" > */}
        <div class="card-body col-lg-4 col-xs-8 col-md-4">
          <div><h5 class="card-title">H6 - Website Name</h5>
          <div class="card-text">
            <p>Meta description of the website in about two lines in this card. If it exceeds two lines then terminate with period. Let’s use word count.</p>
            <a href="#" class="link">Link</a>
          </div>
          </div>
        </div>
      {/* </div> */}
    </>
  );
};

export default Card;
