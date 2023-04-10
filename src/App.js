import { useState } from "react";
import {
  GoogleMap,
  MarkerF,
  LoadScript,
  Autocomplete,
} from "@react-google-maps/api";

import { Grid, TextField, Typography } from "@mui/material";

import { getMapOption, getMapProp } from "./utils/map";
import { getLocalTime, getTimeDisplay, isDay } from "./utils/time";

import { MAP_CENTER, MAP_LIBRARIES } from "./constants/map";

import "./App.scss";

const App = () => {
  const [time, setTime] = useState(null);
  const [value, setValue] = useState(null);
  const [center, setCenter] = useState(MAP_CENTER);

  const onLoad = (autocomplete) => setValue(autocomplete);

  const onPlaceChanged = () => {
    if (value !== null) {
      const { lat, lng, timeOffset } = getMapProp(value);
      setCenter({ lat, lng });

      const time = getLocalTime(timeOffset);
      setTime(time);
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  const option = getMapOption(isDay(time));
  const timeDisplay = getTimeDisplay(time);
  const theme = isDay(time) ? "dark" : "light";

  return (
    <Grid container>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_API_KEY}
        libraries={MAP_LIBRARIES}
      >
        <GoogleMap id="map-container" center={center} options={option}>
          <Autocomplete
            onLoad={onLoad}
            onPlaceChanged={onPlaceChanged}
            className="autocomplete-container"
          >
            <TextField
              className="autocomplete"
              label="What time is it in"
              variant="filled"
            />
          </Autocomplete>

          <MarkerF position={center} />

          <Typography
            variant="h1"
            gutterBottom
            className={`time-display ${theme}`}
          >
            {timeDisplay}
          </Typography>
        </GoogleMap>
      </LoadScript>
    </Grid>
  );
};

export default App;
