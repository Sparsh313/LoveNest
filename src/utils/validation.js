const validator = require("validator");

const ValidateSignUpData = (req, User) => {
  const { name, email } = req.body;

  if (!name) {
    throw new Error("name is not Valid ");
  } else if (name.length < 1 || name.length > 50) {
    throw new Error("name should be smaller than 10 and greater than 2 ");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not Valid ");
  }
};

// const ValidateEditProfileData = (req) => {
//   const allowedEditField = ["name", "age", "gender", "bio", "photo", "skills"];

//   const isEditAllowed = Object.keys(req.body).every((field) =>
//     allowedEditField.includes(field)
//   );
//   return isEditAllowed;
// };
const ValidateEditProfileData = (req) => {
  const allowedEditField = ["name", "age", "gender", "bio", "skills"];

  const isEditAllowed = Object.keys(req.body).every((key) =>
    allowedEditField.includes(key)
  );

  return isEditAllowed;
};

module.exports = { ValidateSignUpData, ValidateEditProfileData };
