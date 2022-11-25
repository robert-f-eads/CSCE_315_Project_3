import './loginPage.css'
import Navbar from "../sharedComponets/Navbar/navbar"
import Footer from "../sharedComponets/Footer/footer"
import adv3 from '../assets/advertisement3.jpg'
import Logo from '../assets/Logo.png'
import {loginCustomer, loginEmployee} from '../databaseConnections/databaseFunctionExports'
import { useState } from 'react'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


async function handleLogin(loginChooser) {
    let name = document.getElementById('nameEntryField').value
    let id = document.getElementById('idEntryField').value

    //Change back to black border on successful entry
    if(document.getElementById('nameEntryField').style.borderColor === "red") {document.getElementById('nameEntryField').style.borderColor = "black"}
    if(document.getElementById('idEntryField').style.borderColor === "red") {document.getElementById('idEntryField').style.borderColor = "black"}
    
    //Make border red if missed entry
    let missing = false
    if(name === "") {document.getElementById('nameEntryField').style.borderColor = "red"; missing=true}
    if(id === "") {document.getElementById('idEntryField').style.borderColor = "red"; missing=true}
    if(missing) {return}  
      

    if(loginChooser) {
        //Call the login function
        let response = await (loginCustomer(id, name))

        //Display error if not valid
        if(response === false) {document.getElementById('notFoundError').classList.remove("showOnError"); return}

        //Give this data to the customer view
        alert(`Welcome ${response[0].firstname} ${response[0].lastname} (id: ${response[0].id})`)
    }
    else {
        //Call the login function
        let response = await (loginEmployee(id, name))
        //Display error if not valid
        if(response === false) {document.getElementById('notFoundError').classList.remove("showOnError"); return}

        //Give this data to the server/manager view
        alert(`Welcome ${response[0].firstname} ${response[0].lastname} (id: ${response[0].id}, admin: ${response[0].isadmin})`)
    }

    //Reset to default on sucessfuly entry
    document.getElementById('notFoundError').classList.add("showOnError")
    document.getElementById('nameEntryField').value = ""
    document.getElementById('idEntryField').value = ""
}

function handleSignUp() {
    alert("Hello")

}

function handleLoginChange(value) {
    if(value) {document.getElementById('signup').classList.add("showOnError")}
    else {document.getElementById('signup').classList.remove("showOnError")}
}

const LoginPage = () => {
    const [loginChooser, setloginChooser] = useState(true)
    const [viewChooser, setviewChooser] = useState(true)
    const [startDate, setStartDate] = useState();

    return <>
        <Navbar display={false}/>
        <div className="mainBody">
            <div className='Login-wrapper'>
                <img id='logo' src={Logo} alt='Logo'/>

                {/* Customer/Employee Login */}
                {viewChooser && <div className="mainBody_Login">
                    <div className='mainBody_Login-center'>
                        <label>First Name</label>
                        <input id="nameEntryField" type="text" placeholder="John"/>
                        {!loginChooser && <label>Employee ID</label>}
                        {loginChooser && <label>Rewards ID</label>}
                        <input id="idEntryField" type="text" placeholder="23"/>
                        <p id="notFoundError" className='showOnError'>*No user found</p>
                        <div id="buttonHolder"><button onClick={() => {handleLogin(loginChooser)}}>Login</button></div>
                    </div>
                    <div className='bottom-wrapper'>
                        <div id="signup" className='signup-wrapper'>
                            <p>Don't have an account?</p>
                            <button onClick={() => {setviewChooser(false)}}>Click to get started</button>
                        </div>
                        <div className='employee-wrapper'>
                            {loginChooser && <button onClick={() => {setloginChooser(false); handleLoginChange(loginChooser)}}>Employee Login</button>}
                            {!loginChooser && <button onClick={() => {setloginChooser(true); handleLoginChange(loginChooser)}}>Customer Login</button>}
                        </div>
                    </div>
                </div>}

                {/* Customer Sign up */}
                {!viewChooser && <div className='mainBody_Signup'>
                    <div className='signup_shared-row'>
                        <div className='entry-stack'>
                            <label>First Name</label>
                            <input id="firstNameEntryField" type="text" placeholder="John"/>
                        </div>
                        <div className='entry-stack'>
                            <label>Last Name</label>
                            <input id="lastNameEntryField" type="text" placeholder="Smith"/>
                        </div>
                    </div>

                    <div className='entry-stack'>
                        <label>Email</label>
                        <input id="emailEntryField" type="text" placeholder="example@mail.com"/>
                    </div>

                    <div className='signup_shared-row'>
                        <div className='entry-stack'>
                            <label>Phone Number</label>
                            <input id="phoneNumberEntryField" type="text" placeholder="xxx-xxx-xxxx"/>
                        </div>
                        <div className='entry-stack'>
                            <label>Birthday</label>
                            <DatePicker id="birthdayEntryField" selected={startDate} onChange={(date) => setStartDate(date)}/>
                        </div>
                    </div>
                    
                    <div className='signup-buttons'>
                        <button onClick={handleSignUp}>Sign Up</button>
                        <button>OAuth</button>
                    </div>

                    <div className='signup-footer'>
                        <p>Already have an account?</p>
                        <button onClick={() => {setviewChooser(true)}}>Click to Log in</button>
                    </div>
                    
                </div>}
            </div>
            
            <div className="mainBody_Pic">
            <img src={adv3} alt='advertisement 3'/>
            </div>
        </div>


        <Footer/>
    </>

}

export default LoginPage