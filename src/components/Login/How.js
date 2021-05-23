import "bootstrap/dist/css/bootstrap.css";
import "./How.css";

const How = () => {
  return (
    <>
      <div className="login-how">
        <h5 className="login-card-title">How does it work?</h5>
        <div className="login-card-text">
          <ul>
            <li> Log in with your Google account</li>
            <li> Enter your age group and location</li>
            <li>
              Done! You’ll receive an email when a vaccine is available at your
              location
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default How;
