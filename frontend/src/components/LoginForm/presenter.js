import React from 'react'
import styles from 'shared/formStyles.module.scss'
import PropTypes from 'prop-types'
import FacebookLogin from "react-facebook-login";


const LoginForm = (props, context) => (
  <div className={styles.formComponent}>
    <form className={styles.form} onSubmit={props.handleSubmit}>
      <input
        type="text"
        placeholder={context.t("Username")}
        className={styles.textInput}
        value={props.usernameValue}
        onChange={props.handleInputChange}
        name="username"
      />
      <input
        type="password"
        placeholder={context.t("Password")}
        className={styles.textInput}
        value={props.passwordValue}
        onChange={props.handleInputChange}
        name="password"
      />
      <input
        type="submit"
        value={context.t("Log in")}
        className={styles.button}
      />
    </form>
    <span className={styles.divider}>{context.t("or")}</span>
    <span className={styles.facebookLink}>
      {/* <ion-icon class={styles.login_logo} name="logo-facebook" />
      {context.t("Log in with Facebook")} */}
      <FacebookLogin
        appId="526117531172293"
        autoLoad={false}
        fields="name,email,picture"
        callback={props.handleFacebookLogin}
        cssClass={styles.login_logo}
        icon="fa-facebook-official"
        textButton={context.t("Login with Facebook")}
      />
    </span>
    <span className={styles.forgotLink}>Forgot password?</span>
  </div>
);

LoginForm.propTypes = {
    usernameValue:PropTypes.string.isRequired,
    passwordValue:PropTypes.string.isRequired,
    handleInputChange:PropTypes.func.isRequired,
    handleSubmit:PropTypes.func.isRequired,
    handleFacebookLogin:PropTypes.func.isRequired,

}

LoginForm.contextTypes = {
    t: PropTypes.func.isRequired,
}



export default LoginForm;