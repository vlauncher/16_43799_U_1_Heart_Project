import { useState, useEffect } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../../features/Slices/authSlice";
import Spinner from "../../layouts/Spinner";
import "../../StyleSheet/sign-in.scss";
import Vector from "../../Assets/Vector.png";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="background">
      <div className="sign-in">
        <div className="container">
          <h1 className="sign-in-up-header text-center">Sign In</h1>
          <form onSubmit={onSubmit}>
            <div className="input-field">
              <input
                type="email"
                name="email"
                placeholder="johndoe@gmail.com"
                value={email}
                onChange={onChange}
              />
            </div>
            <div className="input-field">
              <input
                type="password"
                name="password"
                placeholder="**********"
                value={password}
                onChange={onChange}
                id="password"
              />
              <img src={Vector} alt="" />
            </div>
            <div className="submit">
              <input type="submit" name="submit" value="login" />
            </div>
          </form>
          <p className="text-center p-one">
            <Link to="/forgot-password">forgot password?</Link>
          </p>
          <p className="text-center">
            Don’t have an account?{" "}
            <Link to="/register" className="last-child">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
