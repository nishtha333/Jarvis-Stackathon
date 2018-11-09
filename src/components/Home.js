import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Weather from './Widgets/Weather'
import News from './Widgets/News'
import Stocks from './Widgets/Stocks'
import Movies from './Widgets/Movies'
import TvShows from './Widgets/TvShows'

class Home extends Component {

    render() {
        const { classes } = this.props

        return (
            <Fragment>
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

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styles = {
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

export default withStyles(styles)(Home)