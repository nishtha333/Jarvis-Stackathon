import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

class News extends Component {

    render() {
        const { news } = this.props
        //author, content, description, title, url, urlToImage
        return (
            <Fragment>
                <ul>
                {
                    news.map((article, index) => <li key={index}>
                        <a href={`${article.url}`}>{article.title}</a>
                    </li>)
                }
                </ul>
                <hr />
            </Fragment>
        )
    }
}

const mapStateToProps = ({news}) => {
    return {
        news
    }
}

export default connect(mapStateToProps)(News)