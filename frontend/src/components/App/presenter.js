import React from 'react'
import { Route } from 'react-router-dom'
import styles from "components/App/styles.module.scss"
import Footer from 'components/Footer'


const App = (props, index) =>[

        props.isLoggedIn ? <PrivateRoute key={2} /> : <PublicRoute key={2} />,
        <Footer key={3} />
    

];

const PrivateRoute = props => (
    <div>
        <Route  exact path="/" render={() => "feed"} />
        <Route  path="/explore" render={() => "explore"} />
    </div>
)

const PublicRoute = props => (
    <div>
        <Route exact path="/" render={() => "please login"} />
        <Route path="/forgot" render={() => "password"} />
    </div>

)


export default App;

