const User = require("./usersModel");
const bcrypt = require("bcrypt");

/*
req.body - { username: "examleUserName", password: "examplePassword123" }

*/
const createUser = async (req, res) => {
  try {
    // 1. Generate Salt
    const salt = await bcrypt.genSalt();

    // 2. Generate our hashedPassword
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // 3. utilize our hashedPassword to create a new secure user object
    const secureUserData = {
      username: req.body.username,
      password: hashedPassword,
    };

    // 4. Add user to DB
    const newUser = await User.create(secureUserData);
    res.json({ message: `New User: ${newUser.username} successfully added`});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createUser };
