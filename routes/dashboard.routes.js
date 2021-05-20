//express set up
var express = require("express");
var router = express.Router();
const uploader = require("./../config/cloudinary"); // cloudinary set up
const CollectionModel = require("../models/model.collection");
const CardModel = require("../models/model.card");
const UserModel = require("./../models/model.user");
const protectRoute = require("./../middlewares/protectPrivateRoute");

// display the dashboard view with the list of collections
router.get("/dashboard", protectRoute, (req, res, next) => {
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
    const actualUser = req.session.currentUser;
    if (!req.file) newCollection.image = undefined;
    else newCollection.image = req.file.path;

    console.log(newCollection);

    CollectionModel.create(newCollection)
      .then((createdCollection) => {
        console.log("req params id = ", req.params.id);
        CollectionModel.findByIdAndUpdate(
          createdCollection,
          { $push: { user_id: actualUser } },
          { new: true }
        ) //we link a user to the new collection
          .then((collection) => {
            console.log(collection);
          })
          .catch((err) => console.log(err));

        res.redirect("/dashboard");
      })
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

  // const { name, description } = req.body;
  // const editedCollection = {
  //   name,
  //   description,
  // };

  // if (req.file) editedCollection.image = req.file.secure_url;

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
    const collection = await CollectionModel.findById(req.params.id).populate(
      "cards"
    );
    console.log(collection);
    res.render("dashboard/card", { collection });
  } catch (err) {
    next(err);
  }
});

// CREATE (GET) a new card
router.get("/dashboard/collection/:id/add-card", async (req, res, next) => {
  try {
    // const userCollections = await CollectionModel.find({
    //   user_id: req.session.currentUser.id,
    //   cards : req.params.id})
    const user = await UserModel.find();
    const card = await CardModel.find();
    res.render("dashboard/add-card", {
      user,
      card,
      collectionId: req.params.id,
    });
  } catch (err) {
    next(err);
  }
});

// CREATE (POST) a new card
router.post(
  "/dashboard/:id/add-card",
  uploader.single("image"),
  (req, res, next) => {
    const newCard = { ...req.body };
    console.log(req.params.id);
    if (!req.file) newCard.image = undefined;
    else newCard.image = req.file.path;

    CardModel.create(newCard)
      .then((createdCard) => {
        CollectionModel.findByIdAndUpdate(
          req.params.id,
          { $push: { cards: createdCard._id } },
          { new: true }
        )
          .then((collection) => {
            console.log(collection);
          })
          .catch((err) => console.log(err));

        res.redirect("/dashboard");
      })
      .catch(next);
  }
);

// UPDATE(GET) a existing card
router.get("/collection/update-card/:id", (req, res, next) => {
  UserModel.find();
  CollectionModel.find();
  CardModel.findById(req.params.id)
    .then((result) => res.render("dashboard/update-card", { card: result }))
    .catch(next);
});

// UPDATE(POST) a existing card
router.post(
  "/collection/:id/update-card",
  uploader.single("image"),
  (req, res, next) => {
    const editedCard = { ...req.body };
    console.log("REQ BODY", req.body);
    console.log(editedCard);
    if (!req.file) editedCard.image = undefined;
    else editedCard.image = req.file.path;

    // const { name, description, links } = req.body;
    // const editedCard = {
    //   name,
    //   description,
    //   links,
    // };

    // if (req.file) editedCard.image = req.file.secure_url;

    CardModel.findByIdAndUpdate(req.params.id, editedCard).then((edit) => {
      CollectionModel.findByIdAndUpdate(
        req.params.id,
        { $push: { cards: edit._id } },
        { new: true }
      )
        .then((collection) => {
          console.log(collection);
        })
        .catch((err) => console.log(err));

      res.redirect("/dashboard");
    });
  }
);

//DELETE CARD
router.get("/collection/delete/:id", (req, res, next) => {
  CardModel.findByIdAndRemove(req.params.id)
    .then(() => res.redirect("/dashboard"))
    .catch(next);
});

module.exports = router;
