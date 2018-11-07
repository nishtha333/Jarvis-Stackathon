import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { weatherReducer, getWeather } from './reducers/weather'

const store = createStore(combineReducers({
    weather: weatherReducer,
}), applyMiddleware(logger, thunk))


const init = () => {
    return (dispatch) => {
        dispatch(getWeather())
    }
}

export { init } 

export default store