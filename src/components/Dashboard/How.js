import "bootstrap/dist/css/bootstrap.css";
import "./How.css";

const How = () => {
  return (
    <>
      {/* <div className="card" > */}
      <div className="hows">
          <h5 className="card-title">How does it work?</h5>
          <div className="card-text">
            <ul>
              <li> Enter your age group and location</li>
              <li>
                Done! You’ll receive an email when vaccine is available at your
                location
              </li>
            </ul>
          </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default How;
