import socket from '../socket';

const SET_MOVIES = 'SET_MOVIES'
const _setMovies = (movies) => ({ type: SET_MOVIES, movies })

const getMovies = () => {
    return (dispatch) => {
        socket.on('update-movies', message => {
            dispatch(_setMovies(message))
          })
    }
}

const moviesReducer = (state = [], action) => {
    switch(action.type) {
        case SET_MOVIES:
            return action.movies
        default:
            return state
    }
}

export { moviesReducer, getMovies }
