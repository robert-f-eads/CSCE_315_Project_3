import './navbar.css'

const Navbar = (props) => {
    return <>
        <div className='navbar-container'>
            <div className='navbar-container_buttons'>
                <button>Locate a Store</button>
                <button>Change Language</button>
                {props.display && <button id="login">Login</button>}
            </div>

        </div>
    </>
}

export default Navbar