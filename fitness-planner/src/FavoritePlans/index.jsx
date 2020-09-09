import React, { useState, useEffect, useContext } from 'react';
import './index.css';
import Plan from '../Plans/Plan';
import { userContext } from '../userContext';
import Header from '../Header';
import { Button } from 'react-bootstrap';

const FavoritePlans = ({ isLogged }) => {
  const userValue = useContext(userContext);
  const [temperature, setTemperature] = useState('');
  const [feelTemp, setFeelTemp] = useState('');
  const [units, setUnits] = useState('metric');
  const [unitsSign, setUnitsSign] = useState('C');
  const userPlans =
    (userValue && userValue.plans) ||
    JSON.parse(localStorage.getItem('plans')) ||
    '';
  let message = '';
  let city = '';
  console.log(userPlans);

  if (isLogged) {
    city =
      (userValue && userValue.city) || localStorage.getItem('city') || false;
  }

  if (
    (feelTemp >= 10 && unitsSign === 'C') ||
    (feelTemp >= 50 && unitsSign === 'F')
  ) {
    message = 'Consider going for a walk.';
  }

  useEffect(() => {
    if (isLogged && city) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.toLowerCase()}&APPID=c27fcad2928805171f49ebfa27cfa75b&units=${units}`
      )
        .then((r) => r.json())
        .then((r) => {
          console.log(r);
          setTemperature(r.main.temp);
          setFeelTemp(r.main.feels_like);
        });
    }
  }, [units, unitsSign, isLogged, city]);

  return (
    <React.Fragment>
      <Header isLogged={isLogged} bgColor="dark" />
      {isLogged && city ? (
        <div className="weather-section">
          <p>{`Weather in ${city}`}</p>
          {temperature && feelTemp && units === 'metric' ? (
            <p>
              {temperature}
              <span className="units">&#8451;</span> {`Real feel ${feelTemp}`}
              &#8451;
            </p>
          ) : null}
          {temperature && feelTemp && units === 'imperial' ? (
            <p>
              {temperature}&#8457; {`Real feel ${feelTemp}`}&#8457;
            </p>
          ) : null}
          <p>{message ? message : null}</p>
          {units === 'metric' && (
            <Button
              className="custom-units-button"
              onClick={() => {
                setUnits('imperial');
                setUnitsSign('F');
              }}
              type="button"
            >
              Switch to Imperial units
            </Button>
          )}
          {units === 'imperial' && (
            <Button
              className="custom-units-button"
              onClick={() => {
                setUnits('metric');
                setUnitsSign('C');
              }}
              type="button"
            >
              Switch to Metric units
            </Button>
          )}
        </div>
      ) : null}
      {userPlans ? (
        <div className="plans-tabs">
          <div className="plans">
            {userPlans.map((plan, i) => (
              <Plan key={i} plan={plan} isLogged={isLogged} />
            ))}
          </div>
        </div>
      ) : (
        'Loading ...'
      )}
      {userPlans.length < 1 && (
        <div className="no-plans-fallback">
          <p>You dont have favorite plans yet!</p>
        </div>
      )}
    </React.Fragment>
  );
};

export default FavoritePlans;
