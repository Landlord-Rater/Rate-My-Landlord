import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

//see https://developers.google.com/maps/documentation/javascript/examples/geocoding-reverse for documentation
//https://developers.google.com/maps/documentation/javascript/marker-clustering for marker eventlistener

const GMap = (props) => {
  const googleMapRef = useRef(null);

  let googleMap = null;

  const propObj = props.props.properties;

  useEffect(() => {
    googleMap = initGoogleMap();
    var bounds = new window.google.maps.LatLngBounds();
    const infoWindow = new google.maps.InfoWindow({
      content: "",
      disableAutoPan: true,
    });

    for (let property in propObj) {
      console.log(propObj[property]);
      const marker = createMarker(propObj[property]);
      bounds.extend(marker.position);
      marker.addListener("click", () => {
        infoWindow.setContent(
          `${propObj[property].street_address}, ${propObj[property].city}, ${propObj[property].state} ${propObj[property].zip}`
        );
        infoWindow.open(googleMap, marker);
      });
    }

    googleMap.fitBounds(bounds); // the map to contain all markers
  }, [propObj, props]);

  // initialize the google map
  const initGoogleMap = () => {
    return new window.google.maps.Map(googleMapRef.current, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 6,
    });
  };

  // create marker on google map
  const createMarker = (markerObj) =>
    new window.google.maps.Marker({
      position: { lat: Number(markerObj.lat), lng: Number(markerObj.lng) },
      map: googleMap,
      icon: {
        url: "https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Marker-Outside-Pink.png",
        // set marker width and height
        scaledSize: new window.google.maps.Size(50, 50),
      },
    });

  return (
    <div>
      {props.props.properties && (
        <div ref={googleMapRef} style={{ width: 600, height: 500 }}></div>
      )}
    </div>
  );
};

export default GMap;
