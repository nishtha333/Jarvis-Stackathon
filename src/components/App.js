import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Weather from './Weather'
import News from './News'
import Stocks from './Stocks'
import { init } from '../store'

class App extends Component {

    componentDidMount() {
        this.props.init()
    }

    render() {
        return (
            <Fragment>
                <Weather />
                <News />
                <Stocks />
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