const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: String,
  status: String,
  timeTaken: Date,
});
async function main() {
  await mongoose.connect("mongodb://localhost:27017/todoApp");
  console.log("Connection successfull");
  const Todos = mongoose.model("Todos", todoSchema);
  return Todos;
}
const getTodos = async () => {
  const Todos = await main();
  const result = await Todos.find();
  return result;
};
const putTodos = async (content) => {
  const Todos = await main();
  const result = await Todos.insertMany([content]);
  return result;
};
const deleteTodos = async (content) => {
  const Todos = await main();
  const result = await Todos.deleteOne({ title: content });
  return result;
};
const updateTodos = async (title, status) => {
  const Todos = await main();
  const result = await Todos.updateOne(
    { title: title },
    { $set: { status: status } }
  );
  return result;
};

exports.getTodos = getTodos;
exports.putTodos = putTodos;
exports.deleteTodos = deleteTodos;
exports.updateTodos = updateTodos;
