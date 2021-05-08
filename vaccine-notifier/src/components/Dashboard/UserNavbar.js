import "bootstrap/dist/css/bootstrap.css";
import "./UserNavbar.css";
import { logOut } from "../../services/firebase";
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>



const UserNavbar = () => {
  return (
    <nav class="navbar navbar-expand-md bg-light navbar-light ">
      <a class="navbar-brand" href="#">
        Icon
      </a>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#">
              Home
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#otherresources">
              Other Resources
            </a>
          </li>
          <li class="nav-item">
            <button className="logout-button nav-link" onClick={logOut}>Log Out</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default UserNavbar;
