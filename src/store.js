import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { weatherReducer, getWeather } from './reducers/weather'
import { newsReducer, getNews } from './reducers/news'
import { stocksReducer, getStocks } from './reducers/stocks'
import { moviesReducer, getMovies } from './reducers/movies'
import { tvShowsReducer, getTvShows } from './reducers/tvShows'

const store = createStore(combineReducers({
    weather: weatherReducer,
    news: newsReducer,
    stocks: stocksReducer,
    movies: moviesReducer,
    tvShows: tvShowsReducer
}), applyMiddleware(logger, thunk))


const init = () => {
    return (dispatch) => {
        dispatch(getWeather())
        dispatch(getNews())
        dispatch(getStocks())
        dispatch(getMovies())
        dispatch(getTvShows())
    }
}

export { init } 

export default store