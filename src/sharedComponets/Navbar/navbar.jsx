import './navbar.css'
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'
import {StoreLocate} from '../../connectingViews'

const Navbar = (props) => {
    const [mapDisplay, setMapDisplay] = useState(false)
    const navigate = useNavigate()

    return <>
        <div className='navbar-container'>
            <div className='navbar-container_buttons'>
                <button onClick={() => {setMapDisplay(true)}}>Locate our Store</button>
                <button>Change Language</button>
                {props.display 
                ? <button id="login" onClick={() => {navigate('/login')}}>Login</button> 
                : <button id="login" onClick={() => {navigate('/')}}>Go Home</button>}
            </div>
        </div>
        {mapDisplay && <StoreLocate  mapFunc={setMapDisplay}/>}
    </>
}

export default Navbar