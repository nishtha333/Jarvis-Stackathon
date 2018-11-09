import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Grid, Button, Typography } from '@material-ui/core'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
//import { login } from '../store'

class Login extends Component {

    constructor() {
        super()
        this.state = {
            image: '',
            error: ''
        }
        this.handleLogin = this.handleLogin.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }

    handleLogin(event) {
        const { image } = this.state
        /*
        event.preventDefault()
        this.props.login({ image })
            .then(() => this.props.history.push('/'))
            .catch(error => {
                this.setState({ error: error.message })
            })
        */
    }

    render () {

        const { image, error } = this.state
        const { handleChange, handleLogin } = this

        return (
            <div style={{marginTop: 25, marginBottom: 25, height: "80vh"}}>
                <Grid container justify="center"  >
                    <Grid item>
                        <AccountBoxIcon style={{fontSize: "25vh"}} />
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
        //login: (credentials) => dispatch(login(credentials)),
    } 
}

const styles = {
    element: { margin: 10 }
}

export default connect(null, mapDispatchToProps)(Login)