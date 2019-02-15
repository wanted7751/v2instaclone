import React from "react";

import styles from "./styles.module.scss";

export const LoginForm = props => (
  <div className={styles.formComponent}>
    <form className={styles.form}>
      <input type="text" placeholder="Username" className={styles.textInput} />
      <input
        type="password"
        placeholder="Password"
        className={styles.textInput}
      />
      <input type="submit" value="Log in" className={styles.button} />
    </form>
    <span className={styles.divider}>or</span>
    <span className={styles.facebookLink}>
      <ion-icon class={styles.login_logo} name="logo-facebook" /> Log in
      with Facebook
    </span>
    <span className={styles.forgotLink}>Forgot password?</span>
  </div>
);

export const SignupForm = props => (
  <div className={styles.formComponent}>
    <h3 className={styles.signupHeader}>
      Sign up to see photos and videos from your friends.
    </h3>
    <button className={styles.button}>
      <ion-icon
        class={styles.sign_logo}
        name="logo-facebook"
      />
 Log in with
      Facebook
    </button>
    <span className={styles.divider}>or</span>
    <form className={styles.form}>
      <input type="email" placeholder="Email" className={styles.textInput} />
      <input type="text" placeholder="Full Name" className={styles.textInput} />
      <input
        type="username"
        placeholder="Username"
        className={styles.textInput}
      />
      <input
        type="password"
        placeholder="Password"
        className={styles.textInput}
      />
      <input type="submit" value="Sign up" className={styles.button} />
    </form>
    <p className={styles.terms}>
      By signing up, you agree to our <span>Terms & Privacy Policy</span>.
    </p>
  </div>
);