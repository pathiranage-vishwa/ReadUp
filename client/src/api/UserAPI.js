import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isBuyer, setIsBuyer] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("/user/infor", {
            headers: { Authorization: token },
          });

          setUser(res.data);
          setIsLogged(true);
          res.data.userType === "Admin" ? setIsAdmin(true) : setIsAdmin(false);
          res.data.userType === "Seller"
            ? setIsSeller(true)
            : setIsSeller(false);
          res.data.userType === "Buyer" ? setIsBuyer(true) : setIsBuyer(false);

          setCart(res.data.cart);
          setWishList(res.data.wishList)
        } catch (err) {
          alert(err.response.data.msg);
        }
      };

      getUser();
    }
  }, [token]);

  const addCart = async (book) => {
    if (!isLogged) return alert("Please login to continue buying");

    const check = cart.every((item) => {
      return item._id !== book._id;
    });

    if (check) {
      setCart([...cart, { ...book, quantity: 1 }]);

      await axios.patch(
        "/user/addcart",
        { cart: [...cart, { ...book, quantity: 1 }] },
        {
          headers: { Authorization: token },
        }
      );
      swal("Book added to cart successfully!", {
        icon: "success",
      });
    } else {
      swal("This book is already in the cart", {
        icon: "warning",
      });
    }
  };

  const addWishList = async (book) => {
    if (!isLogged) return alert("Please login to continue buying");

    const check = wishList.every((item) => {
      return item._id !== book._id;
    });

    if (check) {
      setWishList([...wishList, { ...book, quantity: 1 }]);

      await axios.patch(
        "/user/addWishList",
        { wishList: [...wishList, { ...book, quantity: 1 }] },
        {
          headers: { Authorization: token },
        }
      );
      swal("Book added to Wishlist successfully!", {
        icon: "success",
      });
    } else {
      swal("This book is already in the wishlist", {
        icon: "warning",
      });
    }
  };

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    isSeller: [isSeller, setIsSeller],
    isBuyer: [isBuyer, setIsBuyer],
    cart: [cart, setCart],
    wishList: [wishList, setWishList],
    user: [user, setUser],
    addCart: addCart,
    addWishList: addWishList,
    history: [history, setHistory],
  };
}

export default UserAPI;
