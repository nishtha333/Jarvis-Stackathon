import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Grid, Button, Typography } from '@material-ui/core'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import Camera from './Camera'
//import { login } from '../store'

class Login extends Component {

    constructor() {
        super()
        this.state = {
            image: '',
            error: ''
        }
        this.handleLogin = this.handleLogin.bind(this)
        this.handleSetImage = this.handleSetImage.bind(this)
    }

    handleSetImage(image) {
        this.setState({image})
    }

    handleLogin(event) {
        const { image } = this.state
        event.preventDefault()
        this.props.login({ image })
            .then(() => this.props.history.push('/'))
            .catch(error => {
                this.setState({ error: error.message })
            })
    }

    render () {

        const { image, error } = this.state
        const { handleSetImage, handleLogin } = this

        return (
            <div style={{marginTop: 25, marginBottom: 25, height: "80vh"}}>
                <Grid container justify="center"  >
                    <Grid item>
                        <Camera image={image} setImage={handleSetImage} />
                    </Grid>
                </Grid>
                <Grid container justify="center"  >
                    <Grid item>
                        <Button variant="contained" style={{width: "10vw", height: "6vh", margin: 10}}
                            onClick={handleLogin} >
                            Login
                        </Button>

                        <Typography variant="subheading">New User?
                            <Link to="/register">Register Here</Link>
                        </Typography>

                        {
                            error 
                                ? <Typography variant="subheading" style={{ color: "red"}}>Unconfirmed Identity</Typography> 
                                : ""
                        }
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (image) => dispatch(login(image)),
    } 
}

export default connect(null, mapDispatchToProps)(Login)