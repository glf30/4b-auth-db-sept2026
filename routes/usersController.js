const User = require("./usersModel");
const bcrypt = require("bcrypt");


// GET
const getUsers = async (req,res) => {
    try {
        const users = await User.find().select("username -_id");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

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
    res.json({ message: `New User: ${newUser.username} successfully added` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    // verify the user is in DB
    const foundUser = await User.findOne({ username: req.body.username });

    if (!foundUser){
        return res.status(404).json({ message: "Could not find user.  Please sign up or try again" })
    }

    // incoming/login - req.body.password
    // hashedPassword - foundUser.password
    const isCorrectPassword = await bcrypt.compare(req.body.password, foundUser.password);
    
    if(isCorrectPassword){
        res.json({ message: "Login Successful!"})
    } else { 
        // 401 unautherized
        res.status(401).json({ message: "Login failed."})
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createUser, login, getUsers };
