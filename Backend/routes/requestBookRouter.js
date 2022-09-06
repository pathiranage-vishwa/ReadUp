const router = require("express").Router();
const requestBookCtrl = require("../controllers/requestBookCtrl");
const auth = require("../middleware/auth");

router
  .route("/request")
  .get(requestBookCtrl.getRequests)
  .post(auth, requestBookCtrl.createRequests);

router
  .route("/request/:id")
  .delete(requestBookCtrl.deleteRequest)
  .put(requestBookCtrl.updateRequest);

router.route("/managerequest/:id").put(requestBookCtrl.updateRequestStatus);

module.exports = router;
