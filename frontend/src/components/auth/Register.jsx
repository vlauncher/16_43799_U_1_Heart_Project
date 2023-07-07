import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../../features/Slices/authSlice";
import Spinner from "../../layouts/Spinner";
import "../../StyleSheet/sign-up.scss";
import Vector from "../../Assets/Vector.png";
import React from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    password2: "",
  });

  const { first_name, last_name, email, username, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {

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
    if (isError) {
      toast.error(message);
    }

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        first_name,
        last_name,
        email,
        username,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="background">
      <div className="sign-up">
        <div className="container">
          <h1 className="sign-in-up-header text-center">Register</h1>
          <form onSubmit={onSubmit}>
            <div className="input-field">
              <input type="text" name="first_name" placeholder="First Name" value={first_name}
                onChange={onChange} />
            </div>
            <div className="input-field">
              <input type="text" name="last_name" placeholder="Last Name" value={last_name}
                onChange={onChange} />
            </div>
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
              <input type="text" name="username" placeholder="Username" value={username}
                onChange={onChange} />
            </div>

            <div className="input-field">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={onChange}
              />
              <img src={Vector} alt="" />
            </div>
            <div className="input-field">
              <input
                type="password"
                name="password2"
                placeholder="Confirm Password"
                value={password2}
                onChange={onChange}
              />
              <img src={Vector} alt="" />
            </div>
            <div className="submit">
              <input type="submit" name="submit" value="Create account" />
            </div>
          </form>
          <p className="text-center">
            Already have an account?{" "}
            <Link className="last-child" to="/login">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

