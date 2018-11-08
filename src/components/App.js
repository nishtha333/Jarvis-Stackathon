import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Weather from './Weather'
import News from './News'
import Stocks from './Stocks'
import { init } from '../store'

class App extends Component {

    componentDidMount() {
        this.props.init()
    }

    render() {
        const { classes } = this.props

        return (
            <Grid container spacing={16} className={classes.grid}>
                <Grid item xs>
                    <Weather />
                </Grid>
                <Grid item xs>
                    <Stocks />
                </Grid>
                <Grid item xs>
                    <News />
                </Grid>
            </Grid>
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
    grid: {
        alignItems: "flex-start",
        direction: "row",
        justify:"center"
    }
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(App))