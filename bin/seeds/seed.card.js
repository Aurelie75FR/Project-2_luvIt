require("dotenv").config();
require("./../../config/mongo"); // fetch the db connection
const CardModel = require("./../../models/model.card"); // fetch the model

const cards = [
  {
    name: "Temple Wat Arun",
    image:
      "https://www.vanupied.com/wp-content/uploads/bangkok-monument-temple-Wat_Arun_rolf-heinrich.jpeg",
    description:
      "J’ai découvert Jojo hier et il est trop top, du love sur lui big time, ouaaaaaah <3 <3",
    links: [
      "https://www.vanupied.com/bangkok/monuments-bangkok/wat-arun-temple-de-laube-a-bangkok.html",
    ],
  },
  {
    name: "Tour Eiffel",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg/260px-Tour_Eiffel_Wikimedia_Commons.jpg",
    description: "A big steel tower.",
    links: ["https://fr.wikipedia.org/wiki/Tour_Eiffel"],
  },
  {
    name: "Ville-sur-Saulx Castle",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Ch%C3%A2teau_de_Tr%C3%A8ves_4783.jpg/280px-Ch%C3%A2teau_de_Tr%C3%A8ves_4783.jpg",
    description: "A nice castle in a lost east France town.",
    links: ["https://fr.wikipedia.org/wiki/Ch%C3%A2teau_de_Ville-sur-Saulx"],
  },
];

(async function insertCards() {
  try {
    await CardModel.deleteMany(); // empty the styles db collection
    const inserted = await CardModel.insertMany(cards); // insert docs in db
    console.log(
      `seed cards done : ${inserted.length} documents inserted in database !`
    );
  } catch (err) {
    console.error(err);
  }
})();

CardModel.insertMany(cards);
