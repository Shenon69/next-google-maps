"use client"

import { GoogleMap, InfoWindowF, LoadScript, MarkerF } from '@react-google-maps/api'
import React, { useEffect, useState } from 'react'

type Props = {}

const mapContainerStyle = {
    width: '100%',
    height: '70vh'
}

interface UserLocation {
    lat: number,
    lng: number
}


const GoogleMapView = (props: Props) => {
    const [userLocation, setUserLocation] = useState<UserLocation>()

    useEffect(() => {
        const getUserLocation = () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    })
                },
                (error) => {
                    console.error('Error getting location:', error.message);
                },
                { enableHighAccuracy: true }
            );
        }

        getUserLocation()
    }, [])



    return (
        <div>
            <LoadScript
                googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}
                mapIds={[process.env.NEXT_PUBLIC_MAP_ID!]}
            >
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={userLocation}
                    zoom={19}
                    options={{ mapId: process.env.NEXT_PUBLIC_MAP_ID! }}
                >
                    {
                        userLocation && (
                            <>
                                <MarkerF
                                    position={userLocation}
                                    icon={{
                                        url: 'https://cdn-icons-png.flaticon.com/512/1365/1365700.png',
                                        scaledSize: new window.google.maps.Size(50, 50)
                                    }}
                                    onClick={() => {
                                        console.log("This is lt lg from user location", userLocation)
                                    }}
                                />
                                {/*<InfoWindowF
                                    position={userLocation}
                                    zIndex={1}
                                    onCloseClick={() => {
                                        // Do nothing when the close button is clicked
                                    }}
                                >
                                    <button onClick={() => { console.log(userLocation, "lol") }}>
                                        <h2 className='text-black font-bold'>5000 LKR</h2>
                                    </button>
                                </InfoWindowF>
                                */}
                            </>
                        )
                    }
                </GoogleMap>
            </LoadScript>
            <div>
                <button
                    className='border-2 border-white p-2 m-2 rounded-lg'
                    onClick={() => {
                        console.log('location')
                        console.log(userLocation)
                    }}>
                    Get user location
                </button>
            </div>
        </div>
    )
}

export default GoogleMapView