import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress, Typography } from '@material-ui/core';
import WeatherCard from './WeatherCard'

class Weather extends Component {

    render() {
        const { details, error, isLoading, classes } = this.props
        console.log(this.props)
        return (
            <Fragment>
                {
                    ((isLoading === undefined) || isLoading) ? (<CircularProgress className={classes.progress} />)
                        : (error ? <Typography variant="h4">Error Loading Weather Data...</Typography>
                                : <WeatherCard result={details} />
                        )
                }
            </Fragment>
        )
    }
}

const mapStateToProps = ({weather}) => {
    return {
        details: weather.details, 
        error: weather.error,
        isLoading: weather.isLoading
    }
}

Weather.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2
    }
});
  

export default connect(mapStateToProps)(withStyles(styles)(Weather))