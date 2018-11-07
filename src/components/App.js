import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Weather from './Weather'
import { init } from '../store'

class App extends Component {

    componentDidMount() {
        this.props.init()
    }

    render() {
        return (
            <Fragment>
                <Weather />
            </Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        init: () =>  dispatch(init())
    }   
}

export default connect(null, mapDispatchToProps)(App)