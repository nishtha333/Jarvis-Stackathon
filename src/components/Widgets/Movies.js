import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Table, TableHead, TableRow, TableBody, TableCell, CircularProgress, Tooltip } from '@material-ui/core';

class Movies extends Component {

    render() {
        const { movies, classes, isLoading } = this.props
        
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
                        (isLoading 
                            ? <CircularProgress className={classes.progress} />
                            : movies.map((movie, index) => 
                                <Tooltip key={index} title={`${movie.title} : ${movie.overview}`}>
                                    <TableRow className={classes.row}>
                                        <CustomTableCell>{movie.title}</CustomTableCell>
                                        <CustomTableCell>{movie.popularity}</CustomTableCell>
                                    </TableRow>
                                </Tooltip>)
                        )
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
    },
    progress: {
        margin: theme.spacing.unit * 2
    }
});

const mapStateToProps = ({movies}) => {
    return {
        movies,
        isLoading: (movies === undefined || !movies.length)
    }
}

export default connect(mapStateToProps)(withStyles(styles)(Movies))