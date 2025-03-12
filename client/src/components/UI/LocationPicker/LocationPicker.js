import { Box, Stack } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from "mapbox-gl";
import { initializeMapbox } from '../../../utils/MapBox/mapBoxUtils';
import { useTranslation } from 'react-i18next';
const LocationPicker = ({isMobile, handleLocationChange}) => {
    const { t } = useTranslation();
    const [location, setLocation] = useState({
        location: '',
        latitude: '',
        longitude: '',
    })
    const mapContainerRef = useRef(null);
    const geocoderContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const geocoderInstanceRef = useRef(null);
    useEffect(() => {
        const { map, geocoder } = initializeMapbox(
            mapContainerRef,
            geocoderContainerRef,
            (place_name, lat, lng) => {
                handleLocationChange(place_name, { lat, lng });
                setLocation({
                    location: place_name,
                    latitude: lat,
                    longitude: lng,
                });
            },
            t
        );
    
        mapInstanceRef.current = map;
        geocoderInstanceRef.current = geocoder;
    
        // Add clear event listener to reset state
        geocoder.on('clear', () => {
            setLocation({
                location: '',
                latitude: '',
                longitude: '',
            });
            handleLocationChange('', { lat: '', lng: '' });
        });
    
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
            if (geocoderInstanceRef.current) {
                geocoderInstanceRef.current = null;
            }
        };
    }, []);
    
    return (
        <Stack width={'calc(100% + 3.2px)'} ml={1} alignItems={'center'}>
            <Box
                ref={geocoderContainerRef}
                sx={{
                    width: '100%',
                    marginBottom: "8px",
                    "& .mapboxgl-ctrl-geocoder": {
                        width: '100%',
                        border:'none',
                        boxShadow:'none',
                        maxWidth:'none',
                        "& :focus":{
                            outline:'none'
                        }
                    },
                    "& .mapboxgl-ctrl-geocoder--input": {
                        height: '36px',
                        padding: '6px 35px',
                    },
                    "& .mapboxgl-ctrl-geocoder--input::placeholder": {
                            color:'#B8B8B8',
                            fontFamily: 'inherit',
                            fontSize:isMobile ? '0.8rem': '1rem',
                            // fontWeight: '500',

                    },
                    "& .mapboxgl-ctrl-geocoder--icon-search ":{
                        left: '7px',
                        top: '8px',
                        width: '20px',
                        height: '20px',
                        fill:'#B8B8B8'
                
                    },
                    ...inputStyle,
                    fontSize:isMobile ? '0.8rem': '1rem',
                    borderRadius: isMobile ? "0.5rem" : "0.75rem",
                }}
            />
            <Box
                ref={mapContainerRef}
                style={{
                    height: "150px",
                    marginTop: "8px",
                    display: 'none',
                    
                }}
            />
        </Stack>
    )
}

export default LocationPicker

const inputStyle = {
    width: "100%", // Set width to 100% for responsiveness
    height: "2rem",
    marginBottom: "0.5rem",
    alignSelf: "center",
    padding: "0.4rem 0.4rem",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "12px",
    color: "#202227",
    fontFamily: "var(--main-font-family)",
    // paddingLeft: "-.5rem",
  };
