// import logo from "./logo.svg";
import "./App.css";
import UserLogin from "./components/UserLogin";
import Todo from "./components/Todo";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div
        className="App"
        style={{ padding: "1rem", backgroundColor: "turquoise" }}
      >
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/users" element={<UserLogin />}></Route>
          <Route path="/todo" element={<Todo />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
