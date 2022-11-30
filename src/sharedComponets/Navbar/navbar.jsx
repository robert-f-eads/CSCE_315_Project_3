import './navbar.css'
import {useNavigate} from 'react-router-dom'

const Navbar = (props) => {
    const navigate = useNavigate()

    return <>
        <div className='navbar-container'>
            <div className='navbar-container_buttons'>
                <button>Locate a Store</button>
                <button>Change Language</button>
                {props.display 
                ? <button id="login" onClick={() => {navigate('/login')}}>Login</button> 
                : <button id="login" onClick={() => {navigate('/')}}>Go Home</button>}
            </div>

        </div>
    </>
}

export default Navbar