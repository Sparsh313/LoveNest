const validator = require("validator");

const ValidateSignUpData = (req, User) => {
  const { name, email } = req.body;

  if (!name) {
    throw new Error("Name is not Valid ");
  } else if (name.length < 1 || name.length > 50) {
    throw new Error("Name should be smaller than 10 and greater than 2 ");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not Valid ");
  }
};

module.exports = ValidateSignUpData;
