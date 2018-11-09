import React, { Component, Fragment } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Home from './Home'
import Nav from './Nav'
import Login from './User/Login'
import RegisterUser from './User/RegisterUser'
import RegistrationSuccessful from './User/RegistrationSuccessful'
import { init } from '../store'

class App extends Component {

    componentDidMount() {
        this.props.init()
    }

    render() {
        return (
            <Router>
                <Fragment>
                <CssBaseline />
                <Route path="/" render={({ history }) => <Nav history={history} />} />
                <Switch>
                    <Route path="/login" render={({ history }) => <Login history={history} />}/>
                    <Route path="/register" component={RegisterUser} />
                    <Route path="/registerSuccess" component={RegistrationSuccessful} />
                    {/*<Route path="/users/:id/profile" component={Profile} />*/}
                    <Route exact path="/" component={Home} />
                </Switch>
                </Fragment>
            </Router>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        init: () =>  dispatch(init())
    }   
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styles = {
    "@global": {
		body: {
            //backgroundImage: "url('/dist/backgroundImage.png')",
            backgroundColor: "white"
        }
	}
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(App))