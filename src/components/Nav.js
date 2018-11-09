import React, { Fragment, Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { AppBar, Toolbar, IconButton, Button, Menu, MenuItem, Typography } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
//import { logout } from '../store'

class Nav extends Component {

    constructor() {
        super()
        this.state = {
            anchorEl: null
        }
        this.handleProfileMenu = this.handleProfileMenu.bind(this)
        this.handleProfileMenuClose = this.handleProfileMenuClose.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    }

    handleProfileMenu(event) {
        this.setState({ anchorEl: event.currentTarget })
    }

    handleProfileMenuClose() {
        this.setState({ anchorEl: null })
    }

    handleLogout() {
        /*
        this.props.logout()
        this.handleProfileMenuClose()
        this.props.history.push('/')
        */
    }

    render() {
        const { authenticatedUser, classes } = this.props
        const { anchorEl } = this.state
        const { handleProfileMenu, handleProfileMenuClose, handleLogout } = this
        const isOpen = Boolean(anchorEl)

        const loggedInUserSettings = () => {
            return (
                <Fragment>
                    <IconButton onClick={ handleProfileMenu } 
                            aria-owns={isOpen ? 'profile-menu' : null} aria-haspopup="true">
                        <AccountCircleIcon />
                    </IconButton>
                    <Menu id="profile-menu" anchorEl={anchorEl} open={isOpen} onClick={handleProfileMenuClose} >
                        <MenuItem to={`/users/${authenticatedUser.id}/profile`} component={Link} onClick={handleProfileMenuClose} >Account</MenuItem>
                        <MenuItem onClick={handleLogout} >Logout</MenuItem>
                    </Menu>
                </Fragment>
            )
        }

        return (
            <Fragment>
                <AppBar position="static" className={classes.root}>
                    <Toolbar> 
                        <Link to="/" className={classes.title}>
                            <img src="/dist/logo.png"/>
                        </Link>                 
                        {
                            //!authenticatedUser.id 
                                //?  
                                <Button to="/login" component= {Link}>
                                    <Typography variant="subheading" className={classes.login}>Login</Typography>
                                </Button> 
                                //: loggedInUserSettings()
                        } 
                    </Toolbar>
                </AppBar>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        //authenticatedUser
    }
}

const mapDispatchToProps = (dispatch ) => {
    return {
        //logout: () => dispatch(logout())
    }
}

Nav.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styles = {
    root: {
        backgroundColor: "black",
    },
    title: {
        flexGrow: 1
    },
    login: {
        color: "white"
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Nav))