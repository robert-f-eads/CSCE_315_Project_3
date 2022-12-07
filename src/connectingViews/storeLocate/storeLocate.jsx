import './storeLocate.css'
import {useState, useRef} from 'react'
import {useJsApiLoader, GoogleMap, Autocomplete, DirectionsRenderer, MarkerF} from '@react-google-maps/api'
import {AiOutlineClose} from 'react-icons/ai';
import {TiLocationArrow} from 'react-icons/ti'

const center = {lat: 30.61246388688215, lng: -96.341009273326}

/**
 * Functions and display for a maps popup
 * @param {*} props data to use in displaying the page
 * @returns popup maps element
 */
const StoreLocate = (props) => {

    const [map, setMap] = useState(/** @type google.maps.Map */ (null))
    const [directionsResponse, setDirectionsResponse] = useState(/** @type google.maps.DirectionsResult */(null))
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [libraries] = useState(['places'])

    const {isLoaded} = useJsApiLoader ({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries
    })

    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef()

    if(!isLoaded) {return <p>Map is loading...</p>}

    async function calculateRoute() {
        
        if(originRef.current.value === '') {return}

        // eslint-disable-next-line
        var directionService = new google.maps.DirectionsService()
        const results = await directionService.route({
            origin: originRef.current.value,
            destination: "275 Joe Routt Blvd, College Station, TX 77843",
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
        setDirectionsResponse(null)
    }
   
    return (
        <>
            <div className='popup_wrapper'>
                <div className='popup_inner'>
                    <div className='popup_data'>
                        <div className='search_row'>
                            <Autocomplete><input id='addressInput' type='text' placeholder='Starting address' ref={originRef}/></Autocomplete>
                            <button id='calcButton' onClick={() => {calculateRoute()}}>Calculate Route</button>
                            <button id='clearButton' onClick={() => {clearRoute()}}><AiOutlineClose size={20}/></button>
                        </div>
                        <div className='lower_row'>
                            <p className='textDisplay'>Distance:  {distance}</p>
                            <p className='textDisplay'>Duration:  {duration}</p>
                            <button id='centerButton' onClick={() => {map.setZoom(17); map.panTo(center)}}><TiLocationArrow size={30}/></button>
                        </div>
                    </div>
                    <div className='popup_display'>
                        <GoogleMap
                            center={center}
                            zoom={17}
                            options={{zoomControl: true, streetViewControl: false, mapTypeControl: false, fullscreenControl: true}}
                            mapContainerClassName='mapContainer'
                            onLoad={map=>setMap(map)}
                        >
                            {!directionsResponse && <MarkerF position={center}/>}
                            {directionsResponse && <DirectionsRenderer directions={directionsResponse}/>}
                        </GoogleMap>
                    </div>
                    <div className='popup_exit'>
                        <button onClick={() => {props.mapFunc(false)}}><AiOutlineClose size={30}/></button>
                    </div>
                </div>
            </div>
            
        
           
        </>
    )
}

export default StoreLocate