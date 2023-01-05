import React from "react";

import "./form.css";
const Email = ({
  handleChange,
  formValues,
  focused,
  handleEmailValidation,
  emailValidationErrors,
}) => {
  return (
    <div className="inputContainer">
      <label className="inputLabel">Email</label>
      <div className="btnIn">
        <input
          className={!emailValidationErrors ? "inputField" : "invalidInput"}
          key="emailField"
          type="text"
          name="email"
          placeholder="you@example.com"
          defaultValue={formValues.email}
          onChange={handleChange}
          onBlur={handleEmailValidation}
          focus={focused.toString()}
        ></input>
      </div>

      <div className="errorMessage">{emailValidationErrors}</div>
    </div>
  );
};

export default Email;
