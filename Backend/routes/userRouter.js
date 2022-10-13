const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");
const auth = require("../middleware/auth");

router.post("/register", userCtrl.register);

router.post("/login", userCtrl.login);

router.get("/logout", userCtrl.logout);

router.post("/forgot", userCtrl.forgotPassword);

router.post("/reset", auth, userCtrl.resetPassword);

router.get("/refresh_token", userCtrl.refreshToken);

router.get("/infor", auth, userCtrl.getUser);

router.get("/allUsers", userCtrl.getAllUsers);

router.put("/updateUsr/:id", userCtrl.updateAUser);

router.delete("/delete/:id", userCtrl.deleteUser);

router.patch("/addcart", auth, userCtrl.addCart);

router.patch("/addWishList", auth, userCtrl.addWishList);

router.get("/history", auth, userCtrl.history);

module.exports = router;
