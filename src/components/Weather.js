import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

class Weather extends Component {

    render() {
        const { details, error } = this.props

        return (
            <Fragment>
                {error ? "Unable to get Weather Details for Current Location"
                    : <Fragment>
                            {details.city}
                            {details.country}
                            {details.description}
                            {details.humidity}
                            {details.summary}
                            {details.temp}
                            {details.temp_max}
                            {details.temp_min}
                            <img src={details.iconURL} />
                        </Fragment>
                }
                <hr />
            </Fragment>
        )
    }
}

const mapStateToProps = ({weather}) => {
    return {
        details: weather.details, 
        error: weather.error
    }
}

export default connect(mapStateToProps)(Weather)

