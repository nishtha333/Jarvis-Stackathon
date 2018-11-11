import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import { Paper, Table, TableHead, TableRow, TableBody, TableCell, CircularProgress, 
    Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import { updateUser } from '../../store';

class Stocks extends Component {

    constructor () {
        super()
            this.state = {
            open: false,
            tickers: ''
        }
        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubscribe = this.handleSubscribe.bind(this)
    }

    handleOpen = () => {
        this.setState({ open: true })
    }
    
    handleClose = () => {
        this.setState({ open: false, tickers: '' })
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    }

    handleSubscribe(event) {
        event.preventDefault()
        let stocks = this.state.tickers
        const { authenticatedUser } = this.props
        if(stocks.length) {
            stocks = authenticatedUser.stocks.length ? stocks.concat(`,${authenticatedUser.stocks}`) : stocks
            this.props.updateUser({...this.props.authenticatedUser, stocks })
        }
        this.handleClose()
    }

    render() {
        const { stocks, classes, isLoading } = this.props
        //price_date, last_price, close_price, percent_change, open_price, high_price, low_price

        const { open, tickers } = this.state
        const { handleClose, handleOpen, handleChange, handleSubscribe } = this
        
        if(!Object.keys(stocks).length) {
            return null
        }

        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell>Ticker</CustomTableCell>
                            <CustomTableCell>Price (USD)</CustomTableCell>
                            <CustomTableCell>Change</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        (isLoading 
                            ? <CircularProgress className={classes.progress} />
                            : Object.keys(stocks).map(identifier => 
                                <TableRow key={identifier} className={classes.row}>
                                    <CustomTableCell>{identifier}</CustomTableCell>
                                    <CustomTableCell>{stocks[identifier].last_price}</CustomTableCell>
                                    <CustomTableCell 
                                        className={stocks[identifier].percent_change < 0 ? classes.negativeChg: classes.positiveChg }>
                                        {`${(stocks[identifier].percent_change * 100).toFixed(2)} %`}
                                    </CustomTableCell>
                                </TableRow>)
                        )
                    }
                    <Button variant="fab" color="secondary" aria-label="Add" size="small" 
                        className={classes.button} onClick={handleOpen} >
                        <AddIcon />
                    </Button>
                    </TableBody>
                </Table>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add Tickers</DialogTitle>
                        <DialogContent>
                        <DialogContentText>Tickers (Comma Separated)</DialogContentText>
                            <TextField autoFocus margin="dense" id="tickers" label="Tickers" 
                            value={tickers} onChange={handleChange('tickers')} fullWidth />
                        </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">Cancel</Button>
                        <Button onClick={handleSubscribe} color="primary">Subscribe</Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        )
    }
}

Stocks.propTypes = {
    classes: PropTypes.object.isRequired,
};

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: "#673AB7",
        color: theme.palette.common.white,
        fontWeight: "bold",
        fontSize: 16
    },
    body: {
        fontSize: 14,
    },
}))(TableCell)

const styles = theme => ({
    row: {
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.background.default,
        },
    },
    negativeChg: {
        color: "red"
    },
    positiveChg: {
        color: "green"
    },
    progress: {
        margin: theme.spacing.unit * 2
    },
    button: {
        margin: theme.spacing.unit,
    },
})

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: user => dispatch(updateUser(user)),
    }
}

const mapStateToProps = ({stocks, authenticatedUser}) => {
    return {
        stocks,
        authenticatedUser,
        isLoading: (stocks === undefined || !Object.keys(stocks).length)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Stocks))