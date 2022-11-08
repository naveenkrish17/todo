import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async () => {
    var data = JSON.stringify({
      emailId: email,
      password: password,
    });
    try {
      const result = await axios.post(
        "http://localhost:5500/users/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // eslint-disable-next-line eqeqeq
      if (result.data.message == "Login successfull") {
        window.alert("Login successful");
        navigate("/todo");
      } else {
        // window.location.reload();
        window.alert(
          "Login Failed, Please register or check login credentials"
        );
      }
    } catch (err) {
      window.location.reload();
      window.alert(err.response.data.message);
    }
  };

  const onRegister = async () => {
    var data = JSON.stringify({
      emailId: email,
      password: password,
    });
    try {
      const result = await axios.post(
        "http://localhost:5500/users/register",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // eslint-disable-next-line eqeqeq
      if (result.data.message == "Registeration successfull") {
        window.alert("Registration successful, Please login");
        window.location.reload();
      } else {
        // window.location.reload();
        window.alert("Registration Failed, Please register again");
        window.location.reload();
      }
    } catch (err) {
      window.alert("Registration Failed, Please register again", err);
      window.location.reload();
    }
  };

  return (
    <>
      <div className="dashboard">
        <div>
          Please login if you are an existing user/ Register if you are new
        </div>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <br></br>
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <br></br>
        <button onClick={onLogin}>Login</button>
        <button onClick={onRegister}>Register</button>
      </div>
    </>
  );
};
export default UserLogin;
