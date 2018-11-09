import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { List, ListItemText, ListItem, Paper, Typography, CircularProgress } from '@material-ui/core';

class News extends Component {

    render() {
        const { news, classes, isLoading } = this.props

        return (
            <Paper className={classes.paper}>
                <Typography variant="title" className={classes.title}>Top News</Typography>
                {
                    (isLoading ? <CircularProgress className={classes.progress} />
                        :   <List>
                            {
                                news.map((article, index) => 
                                    <ListItem button key={index} component="a" href={article.url} className={classes.button}>
                                        <img src={article.urlToImage} className={classes.image} />
                                        <ListItemText primary={article.title} secondary={article.description} />
                                    </ListItem>
                                )
                            }
                            </List>
                    )
                }
            </Paper>
        )
    }
}

News.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
const styles = theme => ({
    paper: {
        maxHeight: "100%",
        overflow: "auto",
        marginRight: "20px"
    },
    title: {
        backgroundColor: "#448AFF",
        color: theme.palette.common.white,
        fontWeight: "bold",
        fontSize: 16,
        padding: 20
    },
    button: {
        display: "flex"
    },
    image: {
        width: "50px",
        height: "50px"
    },
    progress: {
        margin: theme.spacing.unit * 2
    }
});

const mapStateToProps = ({news}) => {
    return {
        news,
        isLoading: (news === undefined || !news.length)
    }
}

export default connect(mapStateToProps)(withStyles(styles)(News))
