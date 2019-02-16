import React from 'react'
import styles from 'shared/formStyles.module.scss'

const LoginForm = props => (
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


export default LoginForm;