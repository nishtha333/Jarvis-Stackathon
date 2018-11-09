import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Table, TableHead, TableRow, TableBody, TableCell } from '@material-ui/core';

class Movies extends Component {

    render() {
        const { movies, classes } = this.props
        
        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell>Trending Movies</CustomTableCell>
                            <CustomTableCell>Popularity</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        movies.map((movie, index) => 
                            <TableRow key={index} className={classes.row}>
                                <CustomTableCell>{movie.title}</CustomTableCell>
                                <CustomTableCell>{movie.popularity}</CustomTableCell>
                            </TableRow>)
                    }
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

Movies.propTypes = {
    classes: PropTypes.object.isRequired,
};

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: "#F06292",
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

const mapStateToProps = ({movies}) => {
    return {
        movies
    }
}

export default connect(mapStateToProps)(withStyles(styles)(Movies))