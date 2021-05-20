const express = require("express");
const session = require("express-session");
const router = express.Router();
const UserModel = require("./../models/model.user");

/* GET users listing. */
router.get("/user", function (req, res, next) {
  const actualUser = req.session.currentUser;
  
  res.render("user", {actualUser});
});

router.post("/user/:id", (req, res, next) => {
  const editedUser = { ...req.body };
  console.log(req.params.id)
  UserModel.findByIdAndUpdate(req.params.id, editedUser, {new: true})
    .then((user) => {
      req.session.currentUser = user;
      res.redirect("/user")
    })
    .catch(next);
});

router.get("/signout", async (req, res, next) => {
  req.session.destroy(function (err) {
    // cannot access session here anymore
    // console.log(req.session.currentUser);
    res.redirect("/");
  });
});

// router.get('/userprofil', function(req, res, next) {
//   res.render('user');
// });

module.exports = router;
