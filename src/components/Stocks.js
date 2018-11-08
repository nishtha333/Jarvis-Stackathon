import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Table, TableHead, TableRow, TableBody, TableCell } from '@material-ui/core';

class Stocks extends Component {

    render() {
        const { stocks, classes } = this.props
        //price_date, last_price, close_price, percent_change, open_price, high_price, low_price
        
        return (
            <Paper className={classes.paper}>
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
                        Object.keys(stocks).map(identifier => 
                            <TableRow key={identifier} className={classes.row}>
                                <CustomTableCell>{identifier}</CustomTableCell>
                                <CustomTableCell>{stocks[identifier].last_price}</CustomTableCell>
                                <CustomTableCell 
                                    className={stocks[identifier].percent_change < 0 ? classes.negativeChg: classes.positiveChg }>
                                    {`${(stocks[identifier].percent_change * 100).toFixed(2)} %`}
                                </CustomTableCell>
                            </TableRow>)
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
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    paper: {
        height: "100%",
        overflowY: "auto"
    },
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
    }
});

const mapStateToProps = ({stocks}) => {
    return {
        stocks
    }
}

export default connect(mapStateToProps)(withStyles(styles)(Stocks))