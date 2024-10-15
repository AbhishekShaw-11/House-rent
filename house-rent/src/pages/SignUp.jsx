import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../fiberbase.config'
import OAuth from '../components/OAuth'

import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name:"",
    email: "",
    password: "",
  });

  const { name,email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      updateProfile(auth,currentUser,{
        displayName: name,
      })

      const formDataCopy = { ...formData }
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/')
    } catch (error) {
      toast.error("Something went wrong with registration");
    }
  };
  return (
    <div>
      <div className="pageContainer">
        <header>
          <p className="pageHeader"> Welcome Back ! </p>
        </header>

        <form onSubmit={onSubmit}>
        <input
        type="text"
        className="nameInput"
        placeholder="Name"
        value={name}
        id="name"
        onChange={onChange}
      />
          <input
            type="email"
            className="emailInput"
            placeholder="E-mail"
            value={email}
            id="email"
            onChange={onChange}
          />

          <div>
            <input
              type={showPassword ? "text" : "password"}
              className="passwordInput"
              placeholder="Enter your password"
              id="password"
              value={password}
              onChange={onChange}
            />
            <img
              src={visibilityIcon}
              alt="show password"
              className="showPassword"
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>

          <Link to="/forgot-password" className="forgotPasswordLink">
            Forgot Password
          </Link>
          <div className="sinInBar">
            <p className="signInText">SignUp</p>
            <button className="signInButton">
              <ArrowRightIcon fill="#ffffff" width="34 px" height="34" />
            </button>
          </div>
        </form>
        <OAuth />
        <Link to="/signup" className="registerLink">
          Sign Up Instead
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
