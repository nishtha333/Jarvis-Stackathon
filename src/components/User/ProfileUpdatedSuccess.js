import React, { Fragment } from 'react'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const ProfileUpdatedSuccess = ({classes}) => {
    return (
        <Fragment>
            <Typography variant="title" className={classes.title}>
                Profile successfully updated.
            </Typography>
        </Fragment>
    )
}

ProfileUpdatedSuccess.propTypes = {
    classes: PropTypes.object.isRequired,
}

const styles = {
    title: {
        marginTop: "10vh", marginBottom: "5vh", fontWeight: "bold"
    }
}

export default withStyles(styles)(ProfileUpdatedSuccess)