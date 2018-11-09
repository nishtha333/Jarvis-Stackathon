import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core/';

const CurrentWeather = ({classes, result}) => {

  const weather = result.weather[0].icon
  const currentTemp = Math.round(result.main.temp)

  return (
    <div className={classes.root}>
      <div className={classes.flex}>
        <img src={`http://openweathermap.org/img/w/${weather}.png`} alt="WeatherIcon" className={classes.image}/>
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
   image: {
     width: "120px",
     height: "120px"
   }
 };

export default withStyles(styles)(CurrentWeather)