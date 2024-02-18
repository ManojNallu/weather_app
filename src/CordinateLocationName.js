import React, { useEffect, useState } from 'react';

const CoordinationLocationName = ({ cityName, onCoordinatesChange }) => {
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    const apiKey = '98b576af2442059a776a24a53df893fc';

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          setCoordinates({ lat, lon });
          onCoordinatesChange({ lat, lon }); // Pass coordinates to the parent component
        }
      })
      .catch(error => {
        console.error('Error fetching coordinates:', error);
        onCoordinatesChange(null); // Notify parent component if an error occurs
      });
  }, [cityName, onCoordinatesChange]);

  return (
    <div>
      {/* <h2>Coordinates for {cityName}</h2>
      {coordinates ? (
        <p>
          Latitude: {coordinates.lat}, Longitude: {coordinates.lon}
        </p>
      ) : (
        <p>Fetching coordinates...</p>
      )} */}
    </div>
  );
};

export default CoordinationLocationName;
