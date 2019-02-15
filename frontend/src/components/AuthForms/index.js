import React from 'react'
import styles from './styles.module.scss'

export const LoginForm = props => (
         <div>
           <form action="">
             <input type="text" placeholder="Username" />
             <input type="password" placeholder="password" />
             <input type="submit" value="Log in" />
           </form>
           <span>or</span>
        <ion-icon class={styles.login_logo}  name="logo-facebook" />
           <span>Log in with Facebook</span>
           <span>ForgetPassword?</span>
         </div>
       );

export const SignupForm = props => (
         <div>
           <h3>Sign up to see photos and videos from your friends.</h3>
           <button>
             <ion-icon
               class={styles.sign_logo}
               name="logo-facebook"
             />
             login with Facebook
           </button>

           <form action="">
             <input type="email" placeholder="Email" />
             <input type="text" placeholder="Full Name" />
             <input type="username" placeholder="Username" />
             <input type="password" placeholder="Password" />
             <input type="submit" value="Sign up" />
           </form>
           <p>
             By signing up, you agree to our{" "}
             <span>Terms & Privacy Policy</span>
           </p>
         </div>
       );