import React from "react";

import Email from "./Email";
import Password from "./Password";

const SignUp = ({
  setModalTitle,
  setFormName,
  handleChange,
  formValues,
  setFormValues,
  focused,
  handleEmailValidation,
  handlePasswordValidation,
  emailValidationErrors,
  passwordValidationErrors,
  setEmailValidationErrors,
  setPasswordValidationErrors,
  handleSignUp,
}) => {
  const toSignIn = () => {
    setModalTitle("Sign in to your account");
    setFormName("SignIn");
    // setFormValues({
    //   email: "",
    //   password: "",
    // });
    setEmailValidationErrors("");
    setPasswordValidationErrors("");
  };
  return (
    <div className="formContainer">
      <form className="formWrapper" onSubmit={handleSignUp}>
        <Email
          formValues={formValues}
          handleChange={handleChange}
          handleEmailValidation={handleEmailValidation}
          emailValidationErrors={emailValidationErrors}
          focused={focused}
        />

        <Password
          formValues={formValues}
          handleChange={handleChange}
          handlePasswordValidation={handlePasswordValidation}
          passwordValidationErrors={passwordValidationErrors}
          focused={focused}
        />

        <button type="submit" className="submitBtn">
          Create account
        </button>

        <div className="accountSetting">
          <div className="textContainer">
            <div>Already have a account?</div>
            <div className="link" onClick={toSignIn}>
              Sign in
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
