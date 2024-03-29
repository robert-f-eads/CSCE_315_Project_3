import './loginPage.css'
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {GoogleLogin} from '@react-oauth/google'
import jwt_decode from "jwt-decode"
import {Navbar, Footer} from '../../sharedComponets'
import {adv3, Logo} from '../../assets'
import {loginCustomer, loginEmployee, signUpNewMember, authWithGoogle} from '../../databaseConnections/databaseFunctionExports'
import { translateText } from '../../databaseConnections/managerViewFunctions'

/**
 * Handles login through Google OAuth
 * @param {*} props functions and data to use 
 * @returns sign in with google element
 */
function Login(props) {
    const onSuccess = async (res) => {
    
        //Decoding response 
        var decoded = jwt_decode(res.credential);

        //Call login with google 
        let response = await (authWithGoogle(decoded.email))
        
        //Add new user if not found 
        if(response === false) {
            let data = {
                "fname" : decoded.given_name,
                "lname" : decoded.family_name,
                "email" : decoded.email,
                "phone" : null,
                "birthday" : "1900-01-01"
            }
            response = await (signUpNewMember(data))
        }
        
        //Give this data to the customer view
        //alert(`Welcome ${response[0].firstname} ${response[0].lastname} (id: ${response[0].id})`)
        props.setUserData([response[0].firstname, response[0].lastname, response[0].id, 0])

        //Go to appropriate page
        props.navigate('/order')
    }

    const onFailure = () => {console.log("Login Failed")}

    return (
        <div id="googleSignInButton">
            <GoogleLogin
                onSuccess={credentialResponse => {onSuccess(credentialResponse)}}
                onFailure={() => {onFailure()}}
            />
        </div>
    )
}

/**
 * Function to handle logining in both employees and customers
 * @param {bool} loginChooser whether the login is for customer or employee
 * @param {*} navigate function to navigate to a new page
 * @param {*} func function to set user data for later use
 */
async function handleLogin(loginChooser, navigate, func) {
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
        //alert(`Welcome ${response[0].firstname} ${response[0].lastname} (id: ${response[0].id})`)
        func([response[0].firstname, response[0].lastname, response[0].id, 0])

        //Go to appropriate page
        navigate('/order')
    }
    else {
        //Call the login function
        let response = await (loginEmployee(id, name))

        //Display error if not valid
        if(response === false) {document.getElementById('notFoundError').classList.remove("showOnError"); return}

        //Give this data to the server/manager view
        //alert(`Welcome ${response[0].firstname} ${response[0].lastname} (id: ${response[0].id}, admin: ${response[0].isadmin})`)
        func([response[0].firstname, response[0].lastname, response[0].id, response[0].isadmin])

        //Go to appropriate page
        if(response[0].isadmin) {navigate('/managerview')}
        else {navigate('/serverorder')}
    }

    //Reset to default on sucessfuly entry
    document.getElementById('notFoundError').classList.add("showOnError")
    document.getElementById('nameEntryField').value = ""
    document.getElementById('idEntryField').value = ""
}

/**
 * Handles signing up a new customer
 * @param {*} navigate function to navigate to a new page
 * @param {*} func function to set user data for later use
 */
async function handleSignUp(navigate, func) {
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
    //alert(`Welcome ${response[0].firstname} ${response[0].lastname} (id: ${response[0].id})`)
    func([response[0].firstname, response[0].lastname, response[0].id, 0])
    
    //Reset to default on sucessfuly entry
    fields.forEach((field) => {
        if(document.getElementById(field).style.borderColor === "red") {document.getElementById(field).style.borderColor = "black"}
        document.getElementById(field).value = ""
    })
    document.getElementById('errorError').classList.add("showOnError")

    navigate('/order')
}

/**
 * Handles whether or not a signup options should be available
 * @param {bool} value whether or not to show sign up option
 */
function handleLoginChange(value) {
    if(value) {document.getElementById('signup').classList.add("showOnError")}
    else {document.getElementById('signup').classList.remove("showOnError")}
}

/**
 * Functions and display for a login page
 * @param {*} props data to create page
 * @returns login page elemen
 */
const LoginPage = (props) => {
    const [loginChooser, setloginChooser] = useState(true)
    const [viewChooser, setviewChooser] = useState(true)

    const text = {
        'First Name': 'First Name',
        'Employee ID': 'Employee ID',
        'Rewards ID': 'Rewards ID',
        '*No user found': '*No user found',
        'Login': 'Login',
        "Don't have an account?": "Don't have an account?",
        'Click to get started': 'Click to get started',
        'Continue as guest': 'Continue as guest',
        'Employee Login': 'Employee Login',
        'Customer Login': 'Customer Login',
    }
    const [translatedText, setTranslatedText] = useState(text);
    useEffect(() => {
        let originalText = [];
        for(const [key, ] of Object.entries(text)) {
            originalText.push(key);
        }
        const originalTextCopy = originalText.slice();
        Promise.all(originalText.map(async originalTextPiece => {
            let tt = await translateText(originalTextPiece, 'en', props.language)
            return tt.translatedText;
        })).then(translatedText => {
            let tempTranslatedText = {};
            for(let i = 0; i < originalTextCopy.length; i++) {
                let originalTextPiece = originalTextCopy[i];
                let translatedTextPiece = translatedText[i];
                tempTranslatedText[originalTextPiece] = translatedTextPiece;
            }
            setTranslatedText(tempTranslatedText);
        });
    })

    const navigate = useNavigate()

    return <>
        <Navbar display={false} language={props.language} setLanguage={props.setLanguage}/>
        
        <div className="mainBody">
            <div className='Login-wrapper'>
                <img id='logo' src={Logo} alt='Logo'/>

                {/* Customer/Employee Login */}
                {viewChooser && <div className="mainBody_Login">
                    <div className='mainBody_Login-center'>
                        <label>{translatedText['First Name']}</label>
                        <input id="nameEntryField" type="text" placeholder="John"/>
                        {!loginChooser && <label>{translatedText['Employee ID']}</label>}
                        {loginChooser && <label>{translatedText['Rewards ID']}</label>}
                        <input id="idEntryField" type="text" placeholder="23"/>
                        <p id="notFoundError" className='showOnError'>{translatedText['*No user found']}</p>
                        <div id="buttonHolder">
                            <button onClick={() => {handleLogin(loginChooser, navigate, props.setUserData)}}>{translatedText['Login']}</button>
                            {loginChooser && <Login navigate={navigate} setUserData={props.setUserData}/>}
                        </div>
                    </div>
                    <div className='bottom-wrapper'>
                        <div id="signup" className='signup-wrapper'>
                            <p>{translatedText["Don't have an account?"]}</p>
                            <button onClick={() => {setviewChooser(false)}}>{translatedText['Click to get started']}</button>
                            <br/>
                            <button onClick={() => {props.setUserData(["Guest", "Guest", 0, 0]); navigate('/order')}}>{translatedText['Continue as guest']}</button>
                        </div>
                        <div className='employee-wrapper'>
                            {loginChooser && <button onClick={() => {setloginChooser(false); handleLoginChange(loginChooser)}}>{translatedText['Employee Login']}</button>}
                            {!loginChooser && <button onClick={() => {setloginChooser(true); handleLoginChange(loginChooser)}}>{translatedText['Customer Login']}</button>}
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
                        <button onClick={() => {handleSignUp(navigate, props.setUserData)}}>Sign Up</button>
                        <Login displayText="Sign up with Google" navigate={navigate} setUsingGoogle={props.setUsingGoogle}/>
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