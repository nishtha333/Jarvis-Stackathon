import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { weatherReducer, getWeather } from './reducers/weather'
import { newsReducer, getNews } from './reducers/news'
import { stocksReducer, getStocks } from './reducers/stocks'

const store = createStore(combineReducers({
    weather: weatherReducer,
    news: newsReducer,
    stocks: stocksReducer
}), applyMiddleware(logger, thunk))


const init = () => {
    return (dispatch) => {
        dispatch(getWeather())
        dispatch(getNews())
        dispatch(getStocks())
    }
}

export { init } 

export default store