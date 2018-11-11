import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Button, TextField, Typography, Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Camera from './Camera'
import { updateUser, deleteUser } from '../../store';

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            image: '',
            imageUrl: '',
            email: '',
            address: '',
            error: '',
        }
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSetImage = this.handleSetImage.bind(this)
    }

    componentDidMount() {
        const { firstName, lastName, imageUrl, email, address } = this.props.authenticatedUser
        this.setState({ firstName, lastName, imageUrl, email, address })
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    }

    handleSetImage(image) {
        this.setState({image})
    }

    handleUpdate(event) {
        event.preventDefault()
        const { faceId } = this.props.authenticatedUser
        const { firstName, lastName, image, email, address } = this.state
        this.props.updateUser({firstName, lastName, image, email, address, faceId})
            .then(() => this.props.history.push('/profileUpdated'))
            .catch(error => {
                this.setState({ error: error.message });
            }
        ) 
    }

    handleDelete(event) {
        event.preventDefault()
        const { faceId } = this.props.authenticatedUser
        this.props.deleteUser(faceId)
            .then(() => this.props.history.push('/'))
            .catch(error => {
                this.setState({ error: error.message });
            }
        ) 
    }

    render() {
        const { firstName, lastName, image, email, address, error, imageUrl } = this.state
        const { handleChange, handleUpdate, handleDelete, handleSetImage } = this
        const { classes } = this.props

        return (
            <div className={classes.root}>
                <Grid container justify="center">
                    <Grid item>
                        <Paper elevation={1}>
                            <form className={classes.form}>
                                <Typography variant="title" className={classes.element}>Profile</Typography>
                                <TextField required id="firstName" label="First Name" variant="outlined" 
                                    className={classes.element} value={firstName} onChange={handleChange('firstName')}/>

                                <TextField required id="lastName" label="Last Name" variant="outlined"
                                    className={classes.element} value={lastName} onChange={handleChange('lastName')} />

                                <TextField required id="email" label="Email" variant="outlined"
                                    className={classes.element} value={email} onChange={handleChange('email')} />

                                <TextField required id="address" label="Address" variant="outlined"
                                    className={classes.element} value={address} onChange={handleChange('address')} />

                                <Camera image={imageUrl ? imageUrl : image} setImage={handleSetImage} />

                                <Button variant="contained" className={classes.button} onClick={handleUpdate} 
                                    disabled={ !firstName || !lastName || !(image || imageUrl) }>
                                    Update
                                </Button>

                                <Button variant="contained" className={classes.button} color="secondary" onClick={handleDelete} >
                                    Delete Profile
                                </Button>

                                {
                                    error && 
                                        <Typography variant="subheading" className={classes.error}>
                                            {error}
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

const mapStateToProps = ({ authenticatedUser }) => {
    return {
        authenticatedUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: user => dispatch(updateUser(user)),
        deleteUser: (faceId) => dispatch(deleteUser(faceId)),
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
}

const styles = {
    root: {
        marginTop: 25, 
        marginBottom: 25, 
        height: '90vh'
    },
    form: {
        display: 'flex', 
        flexDirection: 'column', 
        width: '40vw', 
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile))