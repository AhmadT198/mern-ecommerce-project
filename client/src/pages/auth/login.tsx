import { SyntheticEvent, useContext, useState } from "react";
import axios from "axios";
import { UserErrors } from "../../models/errors";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import { IShopContext, ShopContext } from "../../context/shop-context";
import "./styles.css";

export const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [_, setCookie] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const { isAuthenticated, setIsAuthenticated } =
    useContext<IShopContext>(ShopContext);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const result = await axios.post("http://localhost:3003/user/login", {
        username,
        password,
      });
      setCookie("access_token", result.data.token);
      localStorage.setItem("userID", result.data.userID);
      setIsAuthenticated(true);
      navigate("/");
    } catch (err: any) {
      let errorMessage: string = "";
      switch (err.response.data.type) {
        case UserErrors.NO_USER_FOUND:
          errorMessage = "User doesnt exist.";
          break;
        case UserErrors.WRONG_CREDENTIALS:
          errorMessage = "Wrong Username/Password combination.";
          break;
        default:
          errorMessage = "Something went wrong!";
      }
      alert(errorMessage);
    }
  };

  return (
    <div className="auth">
      <div className="auth-container">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="username">Username :</label>
            <input
              type="text"
              id="username"
              value={username} //To manipulate the value of the input field, by using the state variable
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password :</label>
            <input
              type="password"
              id="password"
              value={password} //To manipulate the value of the input field, by using the state variable
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button type="submit"> Login </button>
        </form>
        <button onClick={() => navigate("/register")}>
          {" "}
          Create an account{" "}
        </button>
      </div>
    </div>
  );
};
