const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  emailId: String,
  password: String,
});
async function main() {
  await mongoose.connect("mongodb://localhost:27017/todoApp");
  console.log("Connection successfull");
  const Users = mongoose.model("Users", userSchema);
  return Users;
}
async function userLogin(credentials) {
  const Users = await main();
  const result = await Users.find(credentials);
  return result.length > 0 ? true : false;
}
async function userRegister(credentials) {
  const Users = await main();
  const result = await Users.insertMany([credentials]);
  return result.length > 0 ? true : false;
}
exports.userLogin = userLogin;
exports.userRegister = userRegister;
