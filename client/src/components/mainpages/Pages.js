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
import RequestHome from "./requests/RequestHome";
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
import DisplayCards from "./Payment/DisplayCards";
import Home from "../homepage/Home";
import MyAds from "./myAds/MyAds";
import UserProfile from "./auth/UserProfile";
import updateProfile from "./auth/UpdateUser";
import Wishlist from "../mainpages/wishlist/Wishlist";
import generateReport from "./auth/generateReport";
import AddReview from "./Reviews/AddReview";
import UpdateReview from "./Reviews/UpdateReview";
import Reviews from "./Reviews/Reviews";
import ManageReviews from "./Reviews/ManageReviews";
import ManageOrders from "./manageOrders/ManageOrders.js";
import DisplayOrders from "./displayOrders/DispalyOrders";
import Header from "../headers/Header";
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
      <Route path="/reset_pw/:token" exact component={ResetPassword} />
      <Route path="/report" exact component={generateReport} />

      <Route
        path="/userProfile/:id"
        exact
        component={isLogged ? UserProfile : NotFound}
      />

      <Route
        path="/allusers"
        exact
        component={isLogged ? AllUsers : NotFound}
      />
      <Route
        path="/updateProfile/:id"
        exact
        component={isLogged ? updateProfile : NotFound}
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

        <Route path="/review"
               exact component={isLogged ? Reviews : NotFound}
        />
        <Route path="/addreview"
               exact component={isLogged ? AddReview : NotFound}
        />
        <Route path="/updatereview"
               exact component={isLogged ? UpdateReview : NotFound}
        />
        <Route path="/managereviews"
               exact component={isLogged ? ManageReviews : NotFound}
        />

      <Route path="/request"
             exact component={isLogged ? Requests : NotFound}
      />
      <Route
        path="/requestHome"
        exact
        component={isLogged ? RequestHome : NotFound}
      />
      <Route
        path="/allrequest"
        exact
        component={isLogged ? Allrequests : NotFound}
      />
      <Route
        path="/updaterequest/:id"
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
      <Route path="/wishlist" exact component={Wishlist} />

      <Route path="/myAds" exact component={MyAds} />
      <Route path="/manageOrders" exact component={ManageOrders} />
      <Route path="/checkout" exact component={Checkout} />
      <Route path="/addPayment" exact component={AddPayment} />
      <Route path="/displayCard" exact component={DisplayCards} />

      <Route path="/displayOrders" exact component={DisplayOrders} />

      <Route path="*" exact component={NotFound} />
    </Switch>
  );
}

export default Pages;
