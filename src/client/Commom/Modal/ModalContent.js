import React from "react";
import { useState } from "react";
import Cookie from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { ajaxConfigHelper } from "../../helper/index";

import SignIn from "../../components/forms/SignIn";
import SignUp from "../../components/forms/SignUp";
import ChangePassword from "../../components/forms/ChangePassword";
import PasswordReset from "../../components/forms/PasswordReset";
import { CartState } from "../../context/ShoppingCartContext";

const ModalContent = ({
  setModalTitle,
  formName,
  setFormName,
  setIsSignIn,
  onClose,
  setIsAdmin,
  setCartChanged,
}) => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [emailValidationErrors, setEmailValidationErrors] = useState("");
  const [passwordValidationErrors, setPasswordValidationErrors] = useState("");
  // const [isSubmit, setIsSubmit] = useState(false);

  const [focused, setFocused] = useState(false);
  const cookies = new Cookie();
  const navigate = useNavigate();

  const {
    // state: { cart },
    dispatch,
  } = CartState();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleEmailValidation = () => {
    setEmailValidationErrors(validateEmail(formValues));
    setFocused(true);
  };
  const handlePasswordValidation = () => {
    setPasswordValidationErrors(validatePassword(formValues));
    setFocused(true);
  };
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   setIsSubmit(true);
  //   console.log(formValues);
  //   onClose();
  // };
  const handleSignIn = async (event) => {
    event.preventDefault();
    setCartChanged(false);
    try {
      const response = await fetch(
        "/signIn",
        ajaxConfigHelper(
          "",
          {
            email: formValues.email,
            password: formValues.password,
          },
          "POST"
        )
      );
      const result = await response.json();
      // console.log(result);
      if (!response.ok) {
        setEmailValidationErrors(result.emailMessage);
        setPasswordValidationErrors(result.passwordMessage);
      }
      // if (result.email === "testCase1@example.com") {
      //   cookies.set("TOKEN", result.token, {
      //     path: "/",
      //   });
      //   // window.location.href = "/auth";
      // } else {
      //   cookies.set("TOKEN", result.token, {
      //     path: "/free",
      //   });
      //   // window.location.href = "/free";
      // }
      if (result.isAdmin) {
        setIsAdmin(true);
        localStorage.setItem("isAdmin", JSON.stringify(result.isAdmin));
      }
      if (response.ok) {
        // setIsSubmit(true);
        // console.log(isSubmit);
        setIsSignIn(true);
        cookies.set("TOKEN", result.token, {
          path: "/",
        });
        // cookies.set("EMAIL", result.email, { path: "/" });
        // cookies.set("CART", result.cart, { path: "/" });
        dispatch({
          type: "INIT",
          payload: result.cart,
        });
        // alert(result.message);
        // console.log(cart);
        onClose();
        // console.log(cookies);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "/signUp",
        ajaxConfigHelper(
          "",
          {
            email: formValues.email,
            password: formValues.password,
          },
          "POST"
        )
      );
      const result = await response.json();
      // console.log(result);
      if (!response.ok) {
        setEmailValidationErrors(result.emailMessage);
      }
      if (response.ok) {
        // setIsSubmit(true);
        alert("Sign up successfully, now sign in!");
        setModalTitle("Sign in to your account");
        setFormName("SignIn");
        navigate("/signIn");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "/changePassword",
        ajaxConfigHelper(
          "",
          {
            email: formValues.email,
          },
          "PUT"
        )
      );
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        // setIsSubmit(true);
        // console.log(isSubmit);
        setModalTitle("");
        setFormName("PasswordReset");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   if (
  //     emailValidationErrors.length === 0 &&
  //     passwordValidationErrors.length === 0
  //   ) {
  //     console.log(formValues);
  //   }
  // });

  const validateEmail = (values) => {
    let errors = "";
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!regex.test(values.email)) {
      errors = "Invalid Email Input!";
    }
    return errors;
  };

  const validatePassword = (values) => {
    let errors = "";
    if (values.password.length < 4 || values.password.length > 12) {
      errors = "Invalid Password Input!";
    }
    return errors;
  };

  return (
    <div>
      {formName === "SignIn" ? (
        <SignIn
          setFormName={setFormName}
          setModalTitle={setModalTitle}
          handleSignIn={handleSignIn}
          handleChange={handleChange}
          formValues={formValues}
          setFormValues={setFormValues}
          focused={focused}
          handleEmailValidation={handleEmailValidation}
          handlePasswordValidation={handlePasswordValidation}
          emailValidationErrors={emailValidationErrors}
          passwordValidationErrors={passwordValidationErrors}
          setEmailValidationErrors={setEmailValidationErrors}
          setPasswordValidationErrors={setPasswordValidationErrors}
        />
      ) : null}
      {formName === "SignUp" ? (
        <SignUp
          setFormName={setFormName}
          setModalTitle={setModalTitle}
          handleSignUp={handleSignUp}
          handleChange={handleChange}
          formValues={formValues}
          focused={focused}
          handleEmailValidation={handleEmailValidation}
          handlePasswordValidation={handlePasswordValidation}
          emailValidationErrors={emailValidationErrors}
          passwordValidationErrors={passwordValidationErrors}
          setEmailValidationErrors={setEmailValidationErrors}
          setPasswordValidationErrors={setPasswordValidationErrors}
        />
      ) : null}
      {formName === "ChangePassword" ? (
        <ChangePassword
          setFormName={setFormName}
          setModalTitle={setModalTitle}
          handleChangePassword={handleChangePassword}
          handleChange={handleChange}
          formValues={formValues}
          focused={focused}
          handleEmailValidation={handleEmailValidation}
        />
      ) : null}
      {formName === "PasswordReset" ? (
        <PasswordReset
          setFormName={setFormName}
          setModalTitle={setModalTitle}
        />
      ) : null}
    </div>
  );
};

export default ModalContent;
