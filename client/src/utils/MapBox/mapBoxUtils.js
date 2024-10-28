import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

mapboxgl.accessToken = "pk.eyJ1Ijoicml6d2Fub3QiLCJhIjoiY20wYzkwZHlyMDBtdDJrcHV0ZW1kbjA4ayJ9.rqt53odFTEC-GL7U81mVGw";

/**
 * Initializes the Mapbox map and geocoder.
 *
 * @param {object} mapContainerRef - The reference to the map container element.
 * @param {object} geocoderContainerRef - The reference to the geocoder container element.
 * @param {function} onLocationSelect - Callback function to handle location selection, receiving place name, latitude, and longitude.
 */
export const initializeMapbox = (mapContainerRef, geocoderContainerRef, onLocationSelect) => {
  // Check if map has already been initialized
  if (mapContainerRef.current && mapContainerRef.current.childNodes.length === 0) {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [0, 0], // Initial center of the map
      zoom: 1, // Initial zoom level
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: "Search for location...",
      marker: false,
      
    });

    if (geocoderContainerRef.current && geocoderContainerRef.current.childNodes.length === 0) {
      const geocoderElement = geocoder.onAdd(map);
      geocoderContainerRef.current.appendChild(geocoderElement);
      const input = geocoderElement.querySelector('.mapboxgl-ctrl-geocoder--input');
      if (input) {
        input.setAttribute('autocomplete', 'off');
      }
      geocoder.on("result", (e) => {
        const { place_name, geometry } = e.result;
        const [lng, lat] = geometry.coordinates;
        onLocationSelect(place_name, lat, lng);
      });
    }

    return { map, geocoder };
  }

  // Return null if already initialized
  return { map: null, geocoder: null };
};