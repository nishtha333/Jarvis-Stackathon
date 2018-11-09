import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const RegistrationSuccessful = ({classes}) => {
    return (
        <Fragment>
            <Typography variant="title" className={classes.title}>
                Account successfully created.
            </Typography>
            <Typography variant="subheading">
                <Link to="/login">Login Here to proceed..</Link>
            </Typography>
        </Fragment>
    )
}

RegistrationSuccessful.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styles = {
    title: {
        marginTop: "10vh", marginBottom: "5vh", fontWeight: "bold"
    }
};

export default withStyles(styles)(RegistrationSuccessful)