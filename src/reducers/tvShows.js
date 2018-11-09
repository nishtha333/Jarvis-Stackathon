import socket from '../socket';

const SET_TV_SHOWS = 'SET_TV_SHOWS'
const _setTvShows = (tvShows) => ({ type: SET_TV_SHOWS, tvShows })

const getTvShows = () => {
    return (dispatch) => {
        socket.on('update-tv', message => {
            dispatch(_setTvShows(message))
          })
    }
}

const tvShowsReducer = (state = [], action) => {
    switch(action.type) {
        case SET_TV_SHOWS:
            return action.tvShows
        default:
            return state
    }
}

export { tvShowsReducer, getTvShows }
