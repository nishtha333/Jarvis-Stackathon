import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Table, TableHead, TableRow, TableBody, TableCell, CircularProgress } from '@material-ui/core';

class Stocks extends Component {

    render() {
        const { stocks, classes, isLoading } = this.props
        //price_date, last_price, close_price, percent_change, open_price, high_price, low_price
        
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
                    </TableBody>
                </Table>
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
}))(TableCell);

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
    }
});

const mapStateToProps = ({stocks}) => {
    return {
        stocks,
        isLoading: (stocks === undefined || !Object.keys(stocks).length)
    }
}

export default connect(mapStateToProps)(withStyles(styles)(Stocks))