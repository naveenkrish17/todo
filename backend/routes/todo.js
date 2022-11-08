var express = require("express");
var router = express.Router();
const mongo_api_todo = require("../db/todo.db");

/* GET todo listing. */
router.get("/", async function (req, res, next) {
  try {
    const result = await mongo_api_todo.getTodos();
    res.status(200).send(result);
  } catch (err) {
    res.status(404).send({ message: "Check backend logs" });
    console.log(err);
  }
});

router.post("/new", async function (req, res, next) {
  if (!req.body) {
    res.status(404).send({ message: "Please verify the contents sent" });
  } else {
    const result = await mongo_api_todo.putTodos(req.body);
    result
      ? res.status(201).send({ message: "Successfully added your task" })
      : res.status(500).send({ message: "Internal server error" });
  }
});

router.post("/status/:title", async function (req, res, next) {
  const result = await mongo_api_todo.updateTodos(
    req.params.title,
    req.body.status
  );
  result
    ? res.status(200).send({ message: "Updated task status" })
    : res.status(404).send({ message: "Unable to update" });
});

router.delete("/:title", async function (req, res, next) {
  const result = await mongo_api_todo.deleteTodos(req.params.title);
  result
    ? res.status(200).send({ message: "Deleted the task" })
    : res.status(404).send({ message: "Unable to delete" });
});

module.exports = router;
