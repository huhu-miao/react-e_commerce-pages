import React from "react";
import "./form.css";

function PasswordReset() {
  return (
    <div className="formContainer">
      <form className="messageForm">
        <div className="messageBox">
          <span className="resetMessage">
            We have sent the update password link to your email, please check
            that !
          </span>
        </div>
      </form>
    </div>
  );
}

export default PasswordReset;
