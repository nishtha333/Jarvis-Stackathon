import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core/';

const WeatherDetails = ({classes, result}) => {

  const highTemp = Math.round(result.main.temp_max)
  const lowTemp = Math.round(result.main.temp_min)
  const humidity = Math.round(result.main.humidity)

  return (
    <div className={classes.root}>
      <div className={classes.flex}>
        <Typography variant="h6" className={classes.space}>High:</Typography>
        <Typography variant="h6">{`${highTemp}°`}</Typography>
      </div>

      <div className={classes.flex}>
        <Typography variant="h6" className={classes.space}>Low:</Typography>
        <Typography variant="h6">{`${lowTemp}°`}</Typography>
      </div>

      <div className={classes.flex}>
        <Typography variant="h6" className={classes.space}>Humidity:</Typography>
        <Typography variant="h6">{`${humidity}%`}</Typography>
      </div>
    </div>
  );
}

WeatherDetails.propTypes = {
  classes: PropTypes.object.isRequired,
}

const styles = {
  flex: {
      display: 'flex',
   },
   space: {
     marginRight: 8,
   }

 };

export default withStyles(styles)(WeatherDetails)