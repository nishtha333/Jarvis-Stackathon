import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Button, TextField, Typography, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import PropTypes from 'prop-types';
//import { addUser } from '../store';

class RegisterUser extends Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            image: '',
            error: '',
            }

        this.handleRegistration = this.handleRegistration.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    }

    handleRegistration(event) {
        const { firstName, lastName } = this.state;
        event.preventDefault();
        /*this.props
            .addUser({ firstName, lastName })
            .then(() => this.props.history.push('/registerSuccess'))
            .catch(error => {
                console.log(error.errors);
                this.setState({ error: error.message });
            });
        */
    }

    render() {
        const { firstName, lastName, image, error } = this.state;
        const { handleChange, handleRegistration } = this;
        const { classes } = this.props

        return (
            <div className={classes.root}>
                <Grid container justify="center">
                    <Grid item>
                        <Paper elevation={1}>
                            <form className={classes.form}>
                                <Typography variant="title" className={classes.element}>Create account</Typography>
                                <TextField required id="firstName" label="First Name" variant="outlined" 
                                    className={classes.element} value={firstName} onChange={handleChange('firstName')}/>

                                <TextField required id="lastName" label="Last Name" variant="outlined"
                                    className={classes.element} value={lastName} onChange={handleChange('lastName')} />

                                <AccountBoxIcon style={{fontSize: "25vh"}} />

                                <Button variant="contained" className={classes.button} onClick={handleRegistration} 
                                    disabled={ !firstName || !lastName || !image }>
                                    Register
                                </Button>

                                <Typography variant="subheading">Already Registered?
                                    <Link to="/login">Login Here</Link>
                                </Typography>

                                {
                                    error && 
                                        <Typography variant="subheading" className={classes.error}>
                                            Error processing request. Please try again
                                        </Typography>
                                }
                                </form>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addUser: user => dispatch(addUser(user)),
    }
}

RegisterUser.propTypes = {
    classes: PropTypes.object.isRequired,
}

const styles = {
    root: {
        marginTop: 25, 
        marginBottom: 25, 
        height: '80vh'
    },
    form: {
        display: 'flex', 
        flexDirection: 'column', 
        width: '30vw', 
        padding: '5vh 5vw 5vh 5vw'
    },
    element: { 
        margin: 10 
    },
    button: {
        width: '10vw', 
        height: '6vh', 
        margin: 10 
    },
    error: {
        color: "red"
    }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(RegisterUser))