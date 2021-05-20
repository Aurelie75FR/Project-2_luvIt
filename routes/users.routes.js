const express = require("express");
const session = require("express-session");
const router = express.Router();
const UserModel = require("./../models/model.user");

/* GET users listing. */
router.get("/user", function (req, res, next) {
  const currentUser = req.session.currentUser;
  console.log(currentUser)
  res.render("user", {currentUser});
});

// router.get('/userprofil', function(req, res, next) {
//   res.render('user');
// });

module.exports = router;
