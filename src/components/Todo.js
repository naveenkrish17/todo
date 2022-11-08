import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TodoCard from "./TodoCard";
import { useState, useEffect } from "react";
import axios from "axios";
const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    getTodoData();
  }, []);
  const getTodoData = async () => {
    try {
      const result = await axios.get("http://localhost:5500/todo/");
      const data = await result.data;
      setTodoList(data);
      return;
    } catch (err) {
      window.alert("Something went wrong, Let me reload please");
      window.location.reload();
    }
  };
  const onAddTask = async (e) => {
    if (!task.length > 0) {
      window.alert("Please add a task with content");
    } else {
      try {
        const result = axios.post(
          "http://localhost:5500/todo/new",
          {
            title: task,
            status: "Open",
          },
          { headers: { Content: "application/json" } }
        );
        if (result) {
          getTodoData().then(() => {
            setTask("");
          });
          window.location.reload();
        }
      } catch (err) {
        window.alert(err);
        window.location.reload();
      }
    }
  };
  const onTaskProgress = async (el) => {
    try {
      const result = await axios.post(
        `http://localhost:5500/todo/status/${el.title}`,
        { status: "InProgress" },
        { headers: { Content: "application/json" } }
      );
      result
        ? getTodoData().then(() => {
            console.log("Hello");
          })
        : window.location.reload();
    } catch (err) {
      window.location.reload();
    }
  };
  const onTaskComplete = async (el) => {
    try {
      const result = await axios.post(
        `http://localhost:5500/todo/status/${el.title}`,
        { status: "Completed" },
        { headers: { Content: "application/json" } }
      );
      result
        ? getTodoData().then(() => {
            // window.location.reload();
            console.log("Task moved to complete");
          })
        : window.location.reload();
    } catch (err) {
      window.location.reload();
    }
  };

  const onTaskOpen = async (el) => {
    try {
      const result = await axios.post(
        `http://localhost:5500/todo/status/${el.title}`,
        { status: "Open" },
        { headers: { Content: "application/json" } }
      );
      result
        ? getTodoData().then(() => {
            // window.location.reload();
            console.log("Task openend");
          })
        : window.location.reload();
    } catch (err) {
      window.location.reload();
    }
  };
  const onTaskDiscard = async (el) => {
    try {
      const result = await axios.delete(
        `http://localhost:5500/todo/${el.title}`
      );
      result
        ? getTodoData().then(() => {
            // window.location.reload();
            console.log("Task discarded");
          })
        : window.location.reload();
    } catch (err) {
      window.location.reload();
    }
  };

  return (
    <div>
      <Typography variant="h2">
        Happy team tasking !!<br></br>
      </Typography>
      <input
        style={{ width: "370px", height: "2rem" }}
        type="text"
        value={task}
        placeholder="Add your task here please"
        onChange={(e) => {
          setTask(e.target.value);
        }}
      ></input>
      <Button
        style={{ height: "2.39rem" }}
        onClick={onAddTask}
        variant="contained"
      >
        Add me
      </Button>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <TodoCard
          todoList={todoList}
          onTaskProgress={onTaskProgress}
          onTaskComplete={onTaskComplete}
        />
        <TodoCard
          todoList={todoList}
          onTaskComplete={onTaskComplete}
          onTaskOpen={onTaskOpen}
        />

        <TodoCard
          todoList={todoList}
          onTaskDiscard={onTaskDiscard}
          onTaskOpen={onTaskOpen}
          onTaskProgress={onTaskProgress}
        />
      </div>
    </div>
  );
};

export default Todo;
