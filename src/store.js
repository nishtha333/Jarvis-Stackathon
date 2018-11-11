import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { weatherReducer, getWeather } from './reducers/weather'
import { newsReducer, getNews } from './reducers/news'
import { stocksReducer, getStocks, subscribeStocks } from './reducers/stocks'
import { moviesReducer, getMovies } from './reducers/movies'
import { tvShowsReducer, getTvShows } from './reducers/tvShows'
import { authenticatedUserReducer, exchangeTokenForAuth, addUser, login, logout, 
    updateUser, deleteUser } from './reducers/authenticatedUser';

const store = createStore(combineReducers({
    weather: weatherReducer,
    news: newsReducer,
    stocks: stocksReducer,
    movies: moviesReducer,
    tvShows: tvShowsReducer,
    authenticatedUser: authenticatedUserReducer
}), applyMiddleware(logger, thunk))


const init = () => {
    return (dispatch) => {
        dispatch(exchangeTokenForAuth())
        dispatch(getWeather())
        dispatch(getNews())
        dispatch(getStocks())
        dispatch(getMovies())
        dispatch(getTvShows())
    }
}

export { init, addUser, login, logout, updateUser, deleteUser, subscribeStocks } 

export default store