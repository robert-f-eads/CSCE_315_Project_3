import './loginPage.css'
import Navbar from "../sharedComponets/Navbar/navbar"
import Footer from "../sharedComponets/Footer/footer"
import adv3 from '../assets/advertisement3.jpg'
import Logo from '../assets/Logo.png'



const LoginPage = () => {

    return <>
        <Navbar display={false}/>
        <div className="mainBody">
            <div className='Login-wrapper'>
                <img id='logo' src={Logo} alt='Logo'/>
                <div className="mainBody_Login">
                    <div className='mainBody_Login-center'>
                        <label>First Name</label>
                        <input type="text" placeholder="John"/>
                        <label>Rewards ID</label>
                        <input type="text" placeholder="23"/>
                        <div id="buttonHolder"><button onClick={() => {alert("Login")}}>Log In</button></div>
                    </div>
                    <div className='signup-wrapper'>
                        <p>Don't have an account?</p>
                        <p><a>Click to get started</a></p>
                    </div>
                    <div className='employee-wrapper'>
                        <a>Employee Login</a> {/*This just changes what the sign in button does*/}
                    </div>
                
                </div>
            </div>
            
            <div className="mainBody_Pic">
            <img src={adv3} alt='advertisement 3'/>
            </div>
        </div>


        <Footer/>
    </>

}

export default LoginPage