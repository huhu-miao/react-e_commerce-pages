import React from "react";
import Email from "./Email";

function ChangePassword({
  setModalTitle,
  setFormName,
  formValues,
  focused,
  handleEmailValidation,
  emailValidationErrors,
  handleChange,
  handleChangePassword,
  isSubmit,
}) {
  // const toRestMessage = () => {
  //   setModalTitle("");
  //   setFormName("PasswordReset");
  // };
  return (
    <div className="formContainer">
      <form className="hintForm" onSubmit={handleChangePassword}>
        <div className="hintText">
          Enter your email link, we will send you the recovery link
        </div>
        <Email
          formValues={formValues}
          handleChange={handleChange}
          handleEmailValidation={handleEmailValidation}
          emailValidationErrors={emailValidationErrors}
          focused={focused}
        />

        <button type="submit" className="submitBtn">
          Update password
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
