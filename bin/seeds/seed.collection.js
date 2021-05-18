require("dotenv").config();
require("./../../config/mongo"); // fetch the db connection
const CollectionModel = require("./../../models/model.collection"); // fetch the model
const CardsModel = require("./../../models/model.card");

const collections = [
  {
    name: "My favorite monuments",
    image:
      "https://www.merveilles-du-monde.com/images/Monuments/Tour-Eiffel.jpg",
    description: "Find a list here of my favorite monuments",
    cards:null,
  },
];

(async function insertCards() {
  try {
    await CollectionModel.deleteMany(); // empty the collection db collection
    const cards = await Promise.all([
      CardsModel.findOne({ name: "Temple Wat Arun" }),
      CardsModel.findOne({ name: "Tour Eiffel" }),
    ]);
    collections[0].cards = cards[0];
    collections[0].cards = cards[1];
    console.log(cards);
    // CONST  USER SOON

    const inserted = await CollectionModel.insertMany(collections); // insert docs in db
    console.log(`seed collection done : ${inserted.length} documents inserted in database !`);
    process.exit()
  } catch (err) {
    console.error(err);
  }
})();

// CollectionModel.insertMany(collections);
