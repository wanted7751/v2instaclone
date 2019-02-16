import React from 'react';
import styles from "shared/formStyles.module.scss";

const SignupForm = props => (
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

export default SignupForm;