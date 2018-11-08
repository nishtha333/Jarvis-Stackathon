import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core/';

const CurrentWeather = ({classes, result}) => {

  const weather = result.weather[0].main
  const currentTemp = Math.round(result.main.temp)

  return (
    <div className={classes.root}>
      <div className={classes.flex}>
        <img src={`/dist/images/${weather}.png`} alt="WeatherIcon" />
        <Typography variant="h3">{`${currentTemp}°`}</Typography>
      </div>
    </div>
  );
}

CurrentWeather.propTypes = {
  classes: PropTypes.object.isRequired,
}

const styles = {
  flex: {
      display: 'flex',
   },
   root: {
     marginRight: 32,
   },
 };

export default withStyles(styles)(CurrentWeather)