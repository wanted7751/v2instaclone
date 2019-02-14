import React from 'react'
import PropTypes from "prop-types";
import { Route } from 'react-router-dom'
import './styles.module.scss';
import Footer from 'components/Footer'
import Auth from 'components/Auth'

const App = (props, index) =>[

        props.isLoggedIn ? <PrivateRoute key={2} /> : <PublicRoute key={2} />,
        <Footer key={3} />
];

App.propTypes = {
    isLoggedIn:PropTypes.bool.isRequired
}

const PrivateRoute = props => (
    <div>
        <Route  exact path="/" render={() => "feed"} />
        <Route  path="/explore" render={() => "explore"} />
    </div>
)

const PublicRoute = props => (
    <div>
        <Route exact path="/" component={Auth} />
        <Route path="/forgot" render={() => "password"} />
    </div>

)


export default App;

