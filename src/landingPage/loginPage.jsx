import './loginPage.css'
import Navbar from "../sharedComponets/Navbar/navbar"
import Footer from "../sharedComponets/Footer/footer"
import adv3 from '../assets/advertisement3.jpg'
import Logo from '../assets/Logo.png'
import {loginCustomer, loginEmployee, signUpNewMember} from '../databaseConnections/databaseFunctionExports'
import { useState } from 'react'


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

async function handleSignUp() {
    let fields = ["firstNameEntryField", "lastNameEntryField", "emailEntryField", "phoneNumberEntryField", "birthdayEntryField"]
    let fieldData = {}

    //Change back to black border on entry
    fields.forEach((field) => {
        if(document.getElementById(field).style.borderColor === "red") {document.getElementById(field).style.borderColor = "black"}
    })

    //Collecting data
    fields.forEach((field) => {
        if(field === "emailEntryField") {
            if(!(document.getElementById(field).value.includes("@"))){fieldData[field] = ""}
            else{fieldData[field] =  document.getElementById(field).value}
        }
        else if(field === "phoneNumberEntryField") {
            if(document.getElementById(field).value.length !== 10){fieldData[field] = ""}
        }
        else if(field === "birthdayEntryField") {
            if((document.getElementById(field).value.indexOf("-") === 4) && (document.getElementById(field).value.indexOf("-", 5) === 7)) {fieldData[field] = document.getElementById(field).value}
            else {fieldData[field] = ""}
        }
        else {fieldData[field] =  document.getElementById(field).value}
    })

    //Make border red if missed entry
    let missing = false
    fields.forEach((field) => {
        if(fieldData[field] === "") {document.getElementById(field).style.borderColor = "red"; missing=true}
    })
    if(missing) {return}  

    //Call the login function
    let matching = {"firstNameEntryField" : "fname", "lastNameEntryField" : "lname", "emailEntryField" : "email", "phoneNumberEntryField" : "phone", "birthdayEntryField" : "birthday"}
    let data = {}
    fields.forEach((field) => {data[matching[field]] = fieldData[field]})
    let response = await (signUpNewMember(data))

    //Display error if not valid
    if(response === false) {document.getElementById('errorError').classList.remove("showOnError"); return}
    
    //Give this data to the customer view
    alert(`Welcome ${response[0].firstname} ${response[0].lastname} (id: ${response[0].id})`)
    
    //Reset to default on sucessfuly entry
    fields.forEach((field) => {
        if(document.getElementById(field).style.borderColor === "red") {document.getElementById(field).style.borderColor = "black"}
        document.getElementById(field).value = ""
    })
    document.getElementById('errorError').classList.add("showOnError")
}

function handleLoginChange(value) {
    if(value) {document.getElementById('signup').classList.add("showOnError")}
    else {document.getElementById('signup').classList.remove("showOnError")}
}

const LoginPage = () => {
    const [loginChooser, setloginChooser] = useState(true)
    const [viewChooser, setviewChooser] = useState(true)

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
                            <input id="phoneNumberEntryField" type="text" placeholder="xxxxxxxxxx"/>
                        </div>
                        <div className='entry-stack'>
                            <label>Birthday</label>
                            <input id="birthdayEntryField" type="text" placeholder="yyyy-mm-dd"/>
                        </div>
                    </div>
                    <p id="errorError" className='showOnError'>*There is already an account with that phone number or email</p>
                    <div className='signup-buttons'>
                        <button onClick={() => {handleSignUp()}}>Sign Up</button>
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