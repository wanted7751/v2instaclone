import React from 'react';
import PropTypes from 'prop-types'
import styles from "shared/formStyles.module.scss";
import FacebookLogin from "react-facebook-login";

const SignupForm = (props, context) => (
  <div className={styles.formComponent}>
    <h3 className={styles.signupHeader}>
      Sign up to see photos and videos from your friends.
    </h3>
    {/* <button className={styles.button}>
            <ion-icon
                class={styles.sign_logo}
                name="logo-facebook"
            />
            Log in with
                 Facebook
    </button> */}
    <FacebookLogin
      appId="526117531172293"
      autoLoad={true}
      fields="name,email,picture"
      callback={props.handleFacebookLogin}
      cssClass={styles.sign_logo}
      icon="fa-facebook-official"
      textButton={context.t("Signup with Facebook")}
    />
    <span className={styles.divider}>or</span>
    <form className={styles.form} onSubmit={props.handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        className={styles.textInput}
        value={props.emailValue}
        onChange={props.handleInputChange}
        name="email"
      />
      <input
        type="text"
        placeholder="Full Name"
        className={styles.textInput}
        value={props.fullnameValue}
        onChange={props.handleInputChange}
        name="fullname"
      />
      <input
        type="username"
        placeholder="Username"
        value={props.usernameValue}
        onChange={props.handleInputChange}
        name="username"
        className={styles.textInput}
      />
      <input
        type="password"
        placeholder="Password"
        value={props.passwordValue}
        onChange={props.handleInputChange}
        name="password"
        className={styles.textInput}
      />
      <input type="submit" value="Sign up" className={styles.button} />
    </form>
    <p className={styles.terms}>
      By signing up, you agree to our <span>Terms & Privacy Policy</span>.
    </p>
  </div>
);

SignupForm.propTypes={
    usernameValue:PropTypes.string.isRequired,
    passwordValue:PropTypes.string.isRequired,
    fullnameValue:PropTypes.string.isRequired,
    emailValue:PropTypes.string.isRequired,
    handleInputChange:PropTypes.func.isRequired,
    handleSubmit:PropTypes.func.isRequired,

}

SignupForm.contextTypes={
    t:PropTypes.func.isRequired,
}

export default SignupForm;