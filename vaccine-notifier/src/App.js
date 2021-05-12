import React from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./App.css";
import Login from "./Login";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" component={Login} exact />
          <ProtectedRoute path="/dashboard" redirect="/" component={Dashboard} /> 
        </Switch>
      </div>
    </Router>
  );
}

export default App;
