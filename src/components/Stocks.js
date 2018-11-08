import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

class Stocks extends Component {

    render() {
        const { stocks } = this.props
        //price_date, last_price, close_price, percent_change, open_price, high_price, low_price
        return (
            <Fragment>
                <ul>
                {
                    Object.keys(stocks).map(identifier => <li key={identifier}>
                        {`${identifier} ${stocks[identifier].last_price} ${(stocks[identifier].percent_change * 100).toFixed(2)} %` }
                    </li>)
                }
                </ul>
                <hr />
            </Fragment>
        )
    }
}

const mapStateToProps = ({stocks}) => {
    return {
        stocks
    }
}

export default connect(mapStateToProps)(Stocks)