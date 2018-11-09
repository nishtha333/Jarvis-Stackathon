import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, CssBaseline } from '@material-ui/core';
import Weather from './Weather'
import News from './News'
import Stocks from './Stocks'
import Movies from './Movies'
import TvShows from './TvShows'
import { init } from '../store'

class App extends Component {

    componentDidMount() {
        this.props.init()
    }

    render() {
        const { classes } = this.props

        return (
            <Fragment>
                <CssBaseline />
                <Grid container className={classes.gridRow}>
                    <Grid item >
                        <Grid container className={classes.gridColumn}>
                            <Grid item xs className={classes.gridMargin}>
                                <Weather />
                            </Grid>
                            <Grid item xs className={classes.gridMargin}>
                                <Movies />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs>
                        <Grid container className={classes.gridColumn}>
                            <Grid item xs className={classes.gridMargin}>
                                <Stocks />
                            </Grid>
                            
                            <Grid item xs className={classes.gridMargin}>
                                <TvShows />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs className={classes.gridMargin}>
                        <News />
                    </Grid>         
                </Grid>
            </Fragment>
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
            backgroundColor: "#BDBDBD"
        }
	},
    gridRow: {
        alignItems: "flex-start",
        direction: "row",
        justify:"center"
    },
    gridColumn: {
        display: "flex",
        flexDirection: "column"
    },
    gridMargin: {
        margin: "20px"
    }
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(App))