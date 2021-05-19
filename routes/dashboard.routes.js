//express set up
var express = require("express");
var router = express.Router();
const uploader = require("./../config/cloudinary"); // cloudinary set up
const CollectionModel = require("../models/model.collection");
const CardModel = require("../models/model.card");

// display the dashboard view with the list of collections
router.get("/dashboard", (req, res, next) => {
  CollectionModel.find()
    .then((result) =>
      res.render("dashboard/collection", { collection: result })
    )
    .catch(next);
});

// CREATE (GET) a new collection
router.get("/dashboard/add-collection", (req, res, next) => {
  CollectionModel.find()
    .then((result) =>
      res.render("dashboard/add-collection", { collection: result })
    )
    .catch(next);
});

// CREATE (POST) a new collection
router.post(
  "/dashboard/add-collection",
  uploader.single("image"),
  (req, res, next) => {
    const newCollection = { ...req.body };
    if (!req.file) newCollection.image = undefined;
    else newCollection.image = req.file.path;
    newCollection.user_id = req.session.currentUser.id

    CollectionModel.create(newCollection)
      .then(() => res.redirect("/dashboard"))
      .catch(next);
  }
);

// UPDATE (GET) a existing collection

router.get("/dashboard/update-collection/:id", (req, res, next) => {
  CollectionModel.findById(req.params.id)
    .populate("card")
    .then((result) =>
      res.render("dashboard/update-collection", { collection: result })
    )
    .catch(next);
});

// UPDATE (POST) a existing collection
router.post("/dashboard/:id", uploader.single("image"), (req, res, next) => {
  const editedCollection = { ...req.body };
  if (!req.file) editedCollection.image = undefined;
  else editedCollection.image = req.file.path;

  CollectionModel.findByIdAndUpdate(req.params.id, editedCollection)
    .then(() => res.redirect("/dashboard"))
    .catch(next);
});

router.get("/dashboard/delete/:id", (req, res, next) => {
  CollectionModel.findByIdAndRemove(req.params.id)
    .then(() => res.redirect("/dashboard"))
    .catch(next);
});

// display the cards view with the list of cards (within the collection)

// TO MODIFY : DISPLAY ONLY THE CARD THAT ARE LINKED WITH THE COLLECTION
router.get("/dashboard/collection/:id", async (req, res, next) => {
  try {
    const cardInCollection =  await CollectionModel.findById(req.params.id).populate("cards");
    console.log(cardInCollection);
    res.render("dashboard/card", cardInCollection);
  } catch (err) {
    next(err);
  }
});

// CREATE (GET) a new card
router.get("/dashboard/add-card", async (req, res, next) => {
  try{
    const userCollections = await CollectionModel.find({user_id: req.session.currentUser.id})

    res.render('dashboard/add-card', {userCollections})

  }catch(err){
    next(err)
  }

});

// CREATE (POST) a new card
router.post("/dashboard", uploader.single("image"), (req, res, next) => {
    const newCard = { ...req.body };
    if (!req.file) newCard.image = undefined;
    else newCard.image = req.file.path;

    CardModel.create(newCard)
      .then(() => {
        CollectionModel.findByIdAndUpdate(newCard.collection.id, {cards: [...cards, newCard]})
        res.redirect("./dashboard")
      })
      .catch(next);
  }
);

// UPDATE(GET) a existing card
router.get("/collection/update-card/:id", (req, res, next) => {
  CardModel.findById(req.params.id)
    .then((result) => res.render("dashboard/update-card", { card: result }))
    .catch(next);
});

// UPDATE(POST) a existing card
router.post(
  "/collection/update-card/:id",
  uploader.single("image"),
  (req, res, next) => {
    const editedCard = { ...req.body };
    if (!req.file) editedCard.image = undefined;
    else editedCard.image = req.file.path;

    CardModel.findByIdAndUpdate(req.params.id, editedCard)
      .then(() => res.redirect("/dashboard"))
      .catch(next);
  }
);

//DELETE CARD
router.get("/collection/delete/:id", (req, res, next) => {
  CardModel.findByIdAndRemove(req.params.id)
    .then(() => res.redirect("/dashboard"))
    .catch(next);
});

module.exports = router;
