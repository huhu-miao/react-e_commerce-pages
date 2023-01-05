import React from "react";
import { useState } from "react";
import "./form.css";
const Password = ({
  handleChange,
  formValues,
  focused,
  handlePasswordValidation,
  passwordValidationErrors,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };
  return (
    <div className="inputContainer">
      <label className="inputLabel">Password</label>
      <div className="btnIn">
        <input
          className={!passwordValidationErrors ? "inputField" : "invalidInput"}
          key="passwordField"
          name="password"
          type={showPassword ? "text" : "password"}
          defaultValue={formValues.password}
          onChange={handleChange}
          onBlur={handlePasswordValidation}
          focus={focused.toString()}
        ></input>
        <button className="showBtn" onClick={togglePassword}>
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      <div className="errorMessage">{passwordValidationErrors}</div>
    </div>
  );
};

export default Password;
