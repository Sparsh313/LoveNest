const adminAuth = (req, res, next) => {
  const token = "abc";
  const isAdminAuthorized = token === "abca";
  console.log("checking auth");
  if (!isAdminAuthorized) {
    res.status(401).send("Not authorized");
  } else {
    next();
  }
};
const userAuth = (req, res, next) => {
  const token = "abc";
  const isAdminAuthorized = token === "abc";
  console.log("checking auth");
  if (!isAdminAuthorized) {
    res.status(401).send("Not authorized");
  } else {
    next();
  }
};
module.exports = { adminAuth, userAuth };
