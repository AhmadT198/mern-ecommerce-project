import { SyntheticEvent, useContext, useState } from "react";
import axios from "axios";
import { UserErrors } from "../../models/errors";
import "./styles.css";
import { Navigate, useNavigate } from "react-router-dom";
import { IShopContext, ShopContext } from "../../context/shop-context";

export const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { isAuthenticated } = useContext<IShopContext>(ShopContext);
  const navigate = useNavigate();
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3003/user/register", {
        username,
        password,
      });
      alert("Registration Completed! Now Login!");
      navigate("/login");
    } catch (err: any) {
      if (err?.response?.data?.type === UserErrors.USERNAME_ALREADY_EXISTS) {
        alert("ERROR: Username already exists!");
      } else {
        alert("ERROR: Something went wrong!");
      }
    }
  };

  return (
    <div className="auth">
      <div className="auth-container">
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
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

          <button type="submit"> Register </button>
        </form>
        <button onClick={() => navigate("/login")}>
          {" "}
          Already a user? Log in{" "}
        </button>
      </div>
    </div>
  );
};
