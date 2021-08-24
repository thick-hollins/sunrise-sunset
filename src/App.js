import './App.css';
import Header from './components/Header.jsx';
import Map from './components/Map.jsx';
import Text from './components/Text.jsx';
import Visuals from './components/Visuals.jsx';
import { useState, useEffect } from 'react';
const axios = require('axios');

function App() {
  // const [location, setLocation] = useState([-33.8548157, 151.2164539]);
  const [location, setLocation] = useState([53.480759, -2.242631]);
  const [data, setData] = useState({});

  useEffect(() => {
    const locationResponse = axios.get(
      `https://api.sunrise-sunset.org/json?lat=${location[0]}&lng=${location[1]}&formatted=0`
    );
    const timeResponse = axios.get(
      `http://api.timezonedb.com/v2.1/get-time-zone?key=03RXBVO843OF&format=json&by=position&lat=${location[0]}&lng=${location[1]}`
    );

    Promise.all([locationResponse, timeResponse]).then(
      ([locationResponse, timeResponse]) => {
        const {
          data: {
            results: { sunrise, sunset, day_length },
          },
        } = locationResponse;

        const {
          data: { zoneName },
        } = timeResponse;

        setData({ sunrise, sunset, day_length, zoneName });
      }
    );
  }, [location]);

  return (
    <div className="App">
      <Header />
      <Map setLocation={setLocation} />
      <Text data={data} location={location} />
      <Visuals />
    </div>
  );
}

export default App;
