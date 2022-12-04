import './storeLocate.css'
import {useState, useRef} from 'react'
import {useJsApiLoader, GoogleMap, Autocomplete, DirectionsRenderer, MarkerF} from '@react-google-maps/api'

const center = {lat: 30.61246388688215, lng: -96.341009273326}
const libraries = ['places']

const StoreLocate = () => {
    const {isLoaded} = useJsApiLoader ({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: libraries,
    })

    const [map, setMap] = useState(/** @type google.maps.Map */ (null))
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')

    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef()
    /** @type React.MutableRefObject<HTMLInputElement> */
    const destinationRef = useRef()

    if(!isLoaded) {return <p>Map is loading...</p>}

    async function calculateRoute() {
        
        if(originRef.current.value === '' || destinationRef.current.value === '') {return}

        // eslint-disable-next-line
        var directionService = new google.maps.DirectionsService()
        const results = await directionService.route({
            origin: originRef.current.value,
            destination: destinationRef.current.value,
            // eslint-disable-next-line
            travelMode: google.maps.TravelMode.DRIVING
        })

        setDirectionsResponse(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
    }

    function clearRoute() {
        setDistance('')
        setDuration('')
        originRef.current.value = ''
        destinationRef.current.value = ''
        setDirectionsResponse(null)
    }
   
    return (
        <>
            <button onClick={() => {map.setZoom(17); map.panTo(center)}}>Recenter</button>

            <Autocomplete><input type='text' placeholder='Origin' ref={originRef}/></Autocomplete>
            <Autocomplete><input type='text' placeholder='Destination' ref={destinationRef}/></Autocomplete>
            <button onClick={() => {calculateRoute()}}>Calculate Route</button>
            <button onClick={() => {clearRoute()}}>Clear route</button>
            <p>Distance: {distance}</p>
            <p>Duration: {duration}</p>
        
            <GoogleMap
                center={center}
                zoom={17}
                options={{zoomControl: true, streetViewControl: false, mapTypeControl: false, fullscreenControl: true}}
                mapContainerStyle={{width: '100%', height: '100%'}}
                onLoad={map=>setMap(map)}
            >
                {!directionsResponse && <MarkerF position={center}/>}
                {directionsResponse && <DirectionsRenderer directions={directionsResponse}/>}
            </GoogleMap>
        </>
    )
}

export default StoreLocate