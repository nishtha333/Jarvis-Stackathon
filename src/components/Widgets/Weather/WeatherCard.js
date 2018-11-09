import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core/';
import CurrentWeather from './CurrentWeather'
import WeatherDetails from './WeatherDetails'

const WeatherCard = ({classes, result}) => {

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const cityName = result.name
  const country = result.sys.country
  const today = new Date(result.dt * 1000)
  const weatherDescription = capitalizeFirstLetter( result.weather[0].description )

  return (
    <Fragment>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h4">{`${cityName}, ${country}`}</Typography>
          <Typography variant="h6">{`${today.toDateString()}`}</Typography>
          <Typography variant="h6">{weatherDescription}</Typography>
          <div className={classes.flex}>
            <CurrentWeather result= {result}/>
            <WeatherDetails result= {result}/>
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
}

WeatherCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  card: {
    marginBottom: 16,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
  flex: {
      display: 'flex',
      flexWrap: 'wrap'
   },
});

export default withStyles(styles)(WeatherCard);

