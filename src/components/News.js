import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { List, ListItemText, ListItem, Paper } from '@material-ui/core';

class News extends Component {

    render() {
        const { news, classes } = this.props

        return (
            <Paper>
                <List>
                {
                    news.map((article, index) => 
                        <ListItem button key={index} component="a" href={article.url} className={classes.button}>
                            <img src={article.urlToImage} className={classes.image} />
                            <ListItemText primary={article.title} secondary={article.description} />
                        </ListItem>
                    )
                }
                </List>
            </Paper>
        )
    }
}

News.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
const styles = {
    button: {
        display: "flex"
    },
    image: {
        width: "50px",
        height: "50px"
    }
};

const mapStateToProps = ({news}) => {
    return {
        news
    }
}

export default connect(mapStateToProps)(withStyles(styles)(News))
