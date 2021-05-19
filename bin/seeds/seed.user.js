require("dotenv").config();
require("./../../config/mongo"); // fetch the db connection
const UserModel = require("./../../models/model.user"); // fetch the model

const users = [
  {
    firstname: "BettiNA",
    lastName: "souchard",
    password: "12345",
    email: "bettinasouchard@foo.com",
  },
];

(async function insertUsers() {
  try {
    await UserModel.deleteMany(); // empty the styles db collection
    const inserted = await UserModel.insertMany(users); // insert docs in db
    console.log(
      `seed users done : ${inserted.length} documents inserted in database !`
    );
  } catch (err) {
    console.error(err);
  }
})();

UserModel.insertMany(users);
