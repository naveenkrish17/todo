import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div class="home">
        Welcome to your Task maintainer<br></br>
        <Link to="/users">
          <button>Click me to continue</button>
        </Link>
      </div>
    </>
  );
};
export default Home;
