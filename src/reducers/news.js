import socket from '../socket';

const SET_NEWS_ARTICLES = 'SET_NEWS_ARTICLES'
const _setNewsArticles = (articles) => ({ type: SET_NEWS_ARTICLES, articles })

const getNews = () => {
    return (dispatch) => {
        socket.on('update-news', message => {
            if(message.articles) {
                dispatch(_setNewsArticles(message.articles))
            }
          })
    }
}

const newsReducer = (state = [], action) => {
    switch(action.type) {
        case SET_NEWS_ARTICLES:
            return action.articles
        default:
            return state
    }
}

export { newsReducer, getNews }
