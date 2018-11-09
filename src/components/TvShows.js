import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Table, TableHead, TableRow, TableBody, TableCell } from '@material-ui/core';

class TvShows extends Component {

    render() {
        const { tvShows, classes } = this.props
        
        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell>Trending TV Shows</CustomTableCell>
                            <CustomTableCell>Popularity</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        tvShows.map((tvShow, index) => 
                            <TableRow key={index} className={classes.row}>
                                <CustomTableCell>{tvShow.name}</CustomTableCell>
                                <CustomTableCell>{tvShow.popularity}</CustomTableCell>
                            </TableRow>)
                    }
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

TvShows.propTypes = {
    classes: PropTypes.object.isRequired,
};

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: "#4CAF50",
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
    }
});

const mapStateToProps = ({tvShows}) => {
    return {
        tvShows
    }
}

export default connect(mapStateToProps)(withStyles(styles)(TvShows))