import axios from 'axios'

const SET_WEATHER_DETAILS = 'SET_WEATHER_DETAILS'
const SET_ERROR = 'SET_ERROR'
const SET_LOADING = 'SET_LOADING'
const _setWeather = (weatherDetails) => ({ type: SET_WEATHER_DETAILS, weatherDetails })
const _setError = (error) => ({ type: SET_ERROR, error })
const _setLoading = (isLoading) => ({ type: SET_LOADING, isLoading })

var getGeoLocation = function () {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

const getWeather = () => {
    return (dispatch) => {
        if(!window.navigator.geolocation) {
            dispatch(_setError("Unable to get current location"))
        }
        return getGeoLocation()
            .then(position => {
                dispatch(_setLoading(true))
                return axios.get(`/api/weather?latitude=${parseFloat(position.coords.latitude).toFixed(2)}
                    &longitude=${parseFloat(position.coords.longitude).toFixed(2)}&location=geo`)
            }).then(response => response.data)
            .then(weatherDetails => {
                dispatch(_setWeather(weatherDetails))
                dispatch(_setLoading(false))
            })
            .catch(error => {
                dispatch(_setError(error))
                dispatch(_setLoading(false))
            })
    }
}

const weatherReducer = (state = {details: {}, error: '', isLoading: undefined}, action) => {
    switch(action.type) {
        case SET_WEATHER_DETAILS:
            return {details: action.weatherDetails, error: ''}
        case SET_ERROR:
            return {...state, error: action.error}
        case SET_LOADING:
            return {...state, isLoading: action.isLoading}
        default:
            return state
    }
}


export { weatherReducer, getWeather }

