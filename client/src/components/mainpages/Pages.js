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
import Loading from "./utils/loading/Loading";
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
import UserProfile from "./auth/userProfile";
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
  const [isSeller] = state.userAPI.isSeller;

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/books" exact component={Books} />
      <Route path="/detail/:id" exact component={DetailBook} />
      <Route path="/login" exact component={isLogged ? Loading : Login} />
      <Route
        path="/register"
        exact
        component={isLogged ? Loading : Register}
      />
      <Route path="/forget_pw" exact component={ForgotPassword} />
      <Route path="/reset_pw/:token" exact component={ResetPassword} />
      <Route path="/report" exact component={generateReport} />

      <Route
        path="/userProfile/:id"
        exact
        component={isLogged ? UserProfile : Loading}
      />

      <Route
        path="/allusers"
        exact
        component={isAdmin ? AllUsers : NotFound}
      />
      <Route
        path="/updateProfile/:id"
        exact
        component={isLogged ? updateProfile : Loading}
      />

      <Route
        path="/category"
        exact
        component={isAdmin ? Categories : Loading}
      />
      <Route
        path="/allcategory"
        exact
        component={isAdmin ? Allcategories : NotFound}
      />

        <Route path="/review"
               exact component={isLogged ? Reviews : Loading}
        />
        <Route path="/addreview"
               exact component={isLogged ? AddReview : Loading}
        />
        <Route path="/updatereview/:id"
               exact component={isLogged ? UpdateReview : Loading}
        />
        <Route path="/managereviews"
               exact component={isLogged ? ManageReviews : Loading}
        />

      <Route path="/request"
             exact component={isLogged ? Requests : Loading}
      />
      <Route
        path="/requestHome"
        exact
        component={isLogged ? RequestHome : Loading}
      />
      <Route
        path="/allrequest"
        exact
        component={isLogged ? Allrequests : Loading}
      />
      <Route
        path="/updaterequest/:id"
        exact
        component={isLogged ? Updaterequest : Loading}
      />
      <Route
        path="/managerequests"
        exact
        component={isSeller ? Managerequests : NotFound}
      />
      <Route path="/create_book" exact component={CreateBook} />
      <Route
        path="/edit_product/:id"
        exact
        component={isLogged ? CreateBook : Loading}
      />
      <Route
        path="/history"
        exact
        component={isLogged ? OrderHistory : Loading}
      />
      <Route
        path="/history/:id"
        exact
        component={isLogged ? OrderDetails : Loading}
      />
      <Route path="/cart" exact component={Cart} />
      <Route path="/wishlist" exact component={Wishlist} />

      <Route path="/myAds" exact component={isSeller? MyAds : NotFound } />
      <Route path="/manageOrders" exact component={ManageOrders} />
      <Route path="/checkout" exact component={Checkout} />
      <Route path="/addPayment" exact component={AddPayment} />
      <Route path="/displayCard" exact component={DisplayCards} />

      <Route path="/displayOrders" exact component={DisplayOrders} />

      <Route path="*" exact component={Loading} />
    </Switch>
  );
}

export default Pages;
