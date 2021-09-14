import { Link, useHistory } from "react-router-dom";
import favicon from "../../assets/twitter-logo.png";
import CreateTweet from "../create-tweet/CreateTweet.component";
import "./LeftNavigation.styles.css";

export interface LeftNavigationProps {}

const LeftNavigation: React.FC<LeftNavigationProps> = () => {
  const history = useHistory();

  return (
    <div>
      <Link to="/users">
        <img src={favicon} alt="logo" style={{ width: "40px" }} />
      </Link>
      <Link to="/">
        <h2>
          <i className="fa fa-home" aria-hidden="true" />{" "}
          <span className="title">Home</span>
        </h2>
      </Link>
      <Link to="/profile">
        <h2>
          <i className="fa fa-user" aria-hidden="true" />{" "}
          <span className="title">Profile</span>
        </h2>
      </Link>
      <Link to="/users">
        <h2>
          <i className="fa fa-envelope" aria-hidden="true" />{" "}
          <span className="title">Messages</span>
        </h2>
      </Link>
      <Link to="/users">
        <h2>
          <i className="fa fa-bell" aria-hidden="true" />{" "}
          <span className="title">Notifications</span>
        </h2>
      </Link>
      <Link to="/users">
        <h2>
          <i className="fa fa-ellipsis-h" aria-hidden="true" />{" "}
          <span className="title">More</span>
        </h2>
      </Link>
      <CreateTweet />
      <button
        className="edit-button"
        type="submit"
        style={{ padding: "5px 10px", margin: "10px 0" }}
        onClick={() => {
          localStorage.removeItem("token");
          history.push("/signin");
        }}
      >
        <span>Log Out</span>
      </button>
    </div>
  );
};

export default LeftNavigation;
