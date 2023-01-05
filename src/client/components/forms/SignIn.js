import Email from "./Email";
import Password from "./Password";

const SignIn = ({
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
  handleSignIn,
}) => {
  const toSignUp = () => {
    setModalTitle("Sign up to your account");
    setFormName("SignUp");
    setFormValues({
      email: "",
      password: "",
    });
    setEmailValidationErrors("");
    setPasswordValidationErrors("");
  };
  const toChangePassword = () => {
    setModalTitle("Update your password");
    setFormName("ChangePassword");
    setFormValues({
      email: "",
      password: "",
    });
    setEmailValidationErrors("");
    setPasswordValidationErrors("");
  };

  return (
    <div className="formContainer">
      <form className="formWrapper" onSubmit={handleSignIn}>
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
          Sign In
        </button>
        <div className="accountSetting">
          <div>
            <div className="textContainer">
              <div>Don't have an account? </div>

              <div className="link" onClick={toSignUp}>
                Sign up
              </div>
            </div>
          </div>
          <div>
            <div className="link" onClick={toChangePassword}>
              Forgot password?
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
