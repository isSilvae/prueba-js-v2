import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import ProductsList from "./pages/productsList/index";
import ShoppingCart from "./pages/shoppingCart/index";
import Container from "@material-ui/core/Container";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <Container style={{ marginTop: "4vh" }} maxWidth="lg">
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={ProductsList} />
            <Route exact path="/pedidos" component={ShoppingCart} />
          </Switch>
        </div>
      </Router>
    </Container>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
