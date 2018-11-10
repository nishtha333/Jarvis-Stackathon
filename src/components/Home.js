import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import { connect } from 'react-redux'
import Weather from './Widgets/Weather'
import News from './Widgets/News'
import Stocks from './Widgets/Stocks'
import Movies from './Widgets/Movies'
import TvShows from './Widgets/TvShows'
import Login from './User/Login'

class Home extends Component {

    render() {
        const { classes, history, authenticatedUser } = this.props

        return (
            !authenticatedUser.id 
                ? <Login history={history} />
                : <Fragment>
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

const mapStateToProps = ({authenticatedUser}, {history}) => {
    return {
        authenticatedUser,
        history
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
}

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
}

export default connect(mapStateToProps)(withStyles(styles)(Home))