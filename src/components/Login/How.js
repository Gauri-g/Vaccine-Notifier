import "bootstrap/dist/css/bootstrap.css";
import "./How.css";

const How = () => {
  return (
    <>
      {/* <div className="card" > */}
      <div className="how col-lg-12 col-xs-12 col-md-12">
        <div>
          <h5 className="card-title">How does it work?</h5>
          <div className="card-text">
            <ul>
              <li> Log in with your Google account</li>
              <li> Enter your age group and location</li>
              <li>
                Done! You’ll receive an email when a vaccine is available at
                your location
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default How;
