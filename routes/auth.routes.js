const express = require("express")
const router = new express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/model.user')

//GET to log in 
router.get("/auth/signin", (req,res,next)=>{
    res.render("index")
})
//GET to signup
router.get("/auth/signup", (req,res,next)=>{
    res.render("signup")
})
//GET log out redirect homepage
router.get("/signout", (req,res,next)=>{
    req.session.destroy(function(err){
        res.redirect("/index")
    })
})
//POST login homepage
router.post("/auth/signin", async(req,res,next)=>{
    const {email, password} = req.body
    const foundUser =await User.findOne({email:email})

    if(!foundUser){
        req.flash("error", "Wrong Email")
        res.redirect("/index")
    } else{
        const isSamePassword =bcrypt.compareSync(password, foundUser.password)
        if(!isSamePassword){
            req.flash("error", "Wrong Password")
            res.redirect("/index")
        } else{
            const userObject = foundUser.toObject()
            delete userObject.password
            req.session.currentUser = userObject
            req.flash("success", "Welcome!")
            res.redirect("/dashboard")
        }
    }
})
//POST signup redirect to homepage 
router.post("/auth/signup", async (req, res, next) => {
    try {
      const newUser = { ...req.body };
      const foundUser = await User.findOne({ email: newUser.email });
  
      if (foundUser) {
        req.flash("warning", "email already registered");
        res.redirect("/auth/signup");
      } else {
        const hashedPassword = bcrypt.hashSync(newUser.password, 10);
        newUser.password = hashedPassword;
        await User.create(newUser);
        req.flash("success", "Congrats! You can log in");
        res.redirect("/index");
      }
    } catch (err) {
      var errorMsg = "";
      for (field in err.errors) {
        errorMsg += err.errors[field].message + "\n";
      }
      req.flash("error", errorMsg);
      res.redirect("/auth/signup");
    }
  });



module.exports = router;