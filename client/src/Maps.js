import React from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};


function Maps({latLng}) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBthDz94Kq0KnZFtfy4G5NR8fGSM4zMW94"
  })

  return (isLoaded && latLng) ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={latLng}
        zoom={14}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        {latLng && <Marker position={latLng} />}
      </GoogleMap>
  ) : <></>
}
export default React.memo(Maps)

//memo so that the map does not reload itself? 