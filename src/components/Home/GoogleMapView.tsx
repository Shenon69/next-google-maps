import { GoogleMap, LoadScript } from '@react-google-maps/api'
import React from 'react'

type Props = {}

const mapContainerStyle = {
    width: '100%',
    height: '70vh'
}

const cordinates = {
    lat: 6.826843579181239,
    lng: 80.03368295215502,
}

const GoogleMapView = (props: Props) => {
    return (
        <div>
            <LoadScript
                googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}
                mapIds={[process.env.NEXT_PUBLIC_MAP_ID!]}
            >
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={cordinates}
                    zoom={15}
                    options={{ mapId: process.env.NEXT_PUBLIC_MAP_ID! }}
                ></GoogleMap>
            </LoadScript>
        </div>
    )
}

export default GoogleMapView