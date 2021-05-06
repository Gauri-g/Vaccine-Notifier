import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Login from "./Login";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" component={Login} exact />
          <ProtectedRoute path="/dashboard"component={Dashboard}>
            <Dashboard />
          </ProtectedRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
