import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Books from "./books/Books";
import DetailBook from "./detailBook/DetailBook";
import Login from "./auth/Login";
import Register from "./auth/Register";
import OrderHistory from "./history/OrderHistory";
import OrderDetails from "./history/OrderDetails";
import Cart from "./cart/Cart";
import NotFound from "./utils/not_found/NotFound";
import Categories from "./categories/Categories";
import CreateBook from "./createBook/createBook";
import Allcategories from "./categories/Allcategories";
import Requests from "./requests/Requests";
import AllUsers from "./auth/AllUsers";
import Allrequests from "./requests/Allrequests";
import Updaterequest from "./requests/Updaterequest";
import Managerequests from "./requests/Managerequests";
import Checkout from "./Reservation/Checkout";
import AddPayment from "./Payment/AddPayment";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import Home from "../homepage/Home";

import { GlobalState } from "../../GlobalState";

function Pages() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/books" exact component={Books} />
      <Route path="/detail/:id" exact component={DetailBook} />

      <Route path="/login" exact component={isLogged ? NotFound : Login} />
      <Route
        path="/register"
        exact
        component={isLogged ? NotFound : Register}
      />
      <Route path="/forget_pw" exact component={ForgotPassword} />
      <Route path="/reset_pw" exact component={ResetPassword} />

      <Route
        path="/allusers"
        exact
        component={isLogged ? AllUsers : NotFound}
      />

      <Route
        path="/category"
        exact
        component={isAdmin ? Categories : NotFound}
      />
      <Route
        path="/allcategory"
        exact
        component={isAdmin ? Allcategories : NotFound}
      />
      <Route path="/request" exact component={isLogged ? Requests : NotFound} />
      <Route
        path="/allrequest"
        exact
        component={isLogged ? Allrequests : NotFound}
      />
      <Route
        path="/updateuser/:id"
        exact
        component={isLogged ? Updaterequest : NotFound}
      />
      <Route
        path="/managerequests"
        exact
        component={isLogged ? Managerequests : NotFound}
      />
      <Route path="/create_book" exact component={CreateBook} />
      <Route
        path="/edit_product/:id"
        exact
        component={isLogged ? CreateBook : NotFound}
      />

      <Route
        path="/history"
        exact
        component={isLogged ? OrderHistory : NotFound}
      />
      <Route
        path="/history/:id"
        exact
        component={isLogged ? OrderDetails : NotFound}
      />

      <Route path="/cart" exact component={Cart} />

      <Route path="/checkout" exact component={Checkout} />
      <Route path="/addPayment" exact component={AddPayment} />

      <Route path="*" exact component={NotFound} />
    </Switch>
  );
}

export default Pages;