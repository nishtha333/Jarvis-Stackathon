const axios = require('axios')


const SET_AUTHENTICATED_USER = 'SET_AUTHENTICATED_USER'
const _setAuthenticatedUser = (authenticatedUser) => ({ type: SET_AUTHENTICATED_USER, authenticatedUser})

const addUser = (user) => {
    return (dispatch) => {
        return axios.post('/api/users', user)
            .then(response => response.data)
            .catch(error => {
                throw error
            })
        }
  }

const login = (data) => {
    return (dispatch) => {
        return axios.post('/api/auth', data)
            .then(response => response.data)
            .then( result => {
                window.localStorage.setItem('token', result.token);
                dispatch(exchangeTokenForAuth());
            })
            .catch(error => {
                throw error
            })
        }
}

const exchangeTokenForAuth = () => {
    return (dispatch) => {
        const token = window.localStorage.getItem('token');
        if(!token) {
            return 
        }
        return axios.get('/api/auth', {
            headers: {
                authorization: token
            }})
            .then(response => response.data)
            .then(auth => {
                dispatch(_setAuthenticatedUser(auth))
            })
            .catch(ex => window.localStorage.removeItem('token'))
    }
}
  
const logout = () => {
    return (dispatch) => {
        window.localStorage.removeItem('token');
        dispatch(_setAuthenticatedUser({}))
    }
}
  
const authenticatedUserReducer = (state = {}, action) => {
    switch(action.type) {
        case SET_AUTHENTICATED_USER:
            return action.authenticatedUser
        default:
            return state
    }
}

export { login, logout, exchangeTokenForAuth, addUser, authenticatedUserReducer }