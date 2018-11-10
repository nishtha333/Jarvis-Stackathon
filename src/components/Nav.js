import React, { Fragment, Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { AppBar, Toolbar, IconButton, Button, Menu, MenuItem, Typography, Avatar } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { logout } from '../store'

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
        this.props.logout()
        this.handleProfileMenuClose()
        this.props.history.push('/')
    }

    render() {
        const { authenticatedUser, classes } = this.props
        const { anchorEl } = this.state
        const { handleProfileMenu, handleProfileMenuClose, handleLogout } = this
        const isOpen = Boolean(anchorEl)

        const loggedInUserSettings = () => {
            return (
                <Fragment>
                    <IconButton onClick={ handleProfileMenu } className={classes.status}
                            aria-owns={isOpen ? 'profile-menu' : null} aria-haspopup="true">
                        <Typography variant="subheading" className={classes.text}>
                            {`Hello, ${authenticatedUser.firstName}`}
                        </Typography>
                        <Avatar src={authenticatedUser.imageUrl}
                      />
                    </IconButton>
                    <Menu id="profile-menu" anchorEl={anchorEl} open={isOpen} onClick={handleProfileMenuClose} >
                        <MenuItem to={`/users/${authenticatedUser.id}/profile`} component={Link} onClick={handleProfileMenuClose} >Account</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
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
                            !authenticatedUser.id 
                                ?   <Button to="/login" component= {Link}>
                                        <Typography variant="subheading" className={classes.status}>Login</Typography>
                                    </Button> 
                                : loggedInUserSettings()
                        } 
                    </Toolbar>
                </AppBar>
            </Fragment>
        )
    }
}

const mapStateToProps = ({authenticatedUser}) => {
    return {
        authenticatedUser
    }
}

const mapDispatchToProps = (dispatch ) => {
    return {
        logout: () => dispatch(logout())
    }
}

Nav.propTypes = {
    classes: PropTypes.object.isRequired,
}

const styles = {
    root: {
        backgroundColor: "black",
    },
    title: {
        flexGrow: 1
    },
    status: {
        color: "white"
    },
    text: {
        color: "white",
        margin: 10
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Nav))