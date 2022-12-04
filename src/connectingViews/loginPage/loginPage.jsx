import './loginPage.css'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {GoogleLogin, GoogleLogout} from 'react-google-login'
import {Navbar, Footer} from '../../sharedComponets'
import {adv3, Logo} from '../../assets'
import {loginCustomer, loginEmployee, signUpNewMember, authWithGoogle} from '../../databaseConnections/databaseFunctionExports'

const clientId = process.env.REACT_APP_CLIENTID

function Login(props) {

    const onSuccess = async (res) => { 
        //Call login with google
        let response = await (authWithGoogle(res.profileObj.email))

        //Add new user if not found 
        if(response === false) {
            let data = {
                "fname" : res.profileObj.givenName,
                "lname" : res.profileObj.familyName,
                "email" : res.profileObj.email,
                "phone" : "xxxxxxxxxx",
                "birthday" : "1900-01-01"
            }
            response = await (signUpNewMember(data))
        }
        
        //Give this data to the customer view
        alert(`Welcome ${response[0].firstname} ${response[0].lastname} (id: ${response[0].id})`)

        //Go to appropriate page - passing "using google" as true
        props.navigate('/order')
    }

    const onFailure = (res) => {console.log("Unable to login due to ", res)}

    return (
        <div id="googleSignInButton">
            <GoogleLogin
                clientId={clientId}
                buttonText={props.displayText}
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={false}
            />
        </div>
    )
}

export function Logout(props) {

    const onSuccess = () => {console.log("Log out successfull!"); props.data()}

    return(
        <GoogleLogout
            clientId={clientId}
            buttonText={"Logout"}
            onLogoutSuccess={() => onSuccess}
        />
    )
}

async function handleLogin(loginChooser, navigate) {
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

        //Go to appropriate page
        navigate('/order')
    }
    else {
        //Call the login function
        let response = await (loginEmployee(id, name))

        //Display error if not valid
        if(response === false) {document.getElementById('notFoundError').classList.remove("showOnError"); return}

        //Give this data to the server/manager view
        alert(`Welcome ${response[0].firstname} ${response[0].lastname} (id: ${response[0].id}, admin: ${response[0].isadmin})`)

        //Go to appropriate page
        if(response[0].isadmin) {navigate('/managerview')}
        else {navigate('/serverorder')}
    }

    //Reset to default on sucessfuly entry
    document.getElementById('notFoundError').classList.add("showOnError")
    document.getElementById('nameEntryField').value = ""
    document.getElementById('idEntryField').value = ""
}

async function handleSignUp(navigate) {
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

    navigate('/order')
}

function handleLoginChange(value) {
    if(value) {document.getElementById('signup').classList.add("showOnError")}
    else {document.getElementById('signup').classList.remove("showOnError")}
}

const LoginPage = () => {
    const [loginChooser, setloginChooser] = useState(true)
    const [viewChooser, setviewChooser] = useState(true)
    const navigate = useNavigate()

    return <>
        <Navbar display={false}/>
        
        <div className="mainBody">
            {/*<Logout data={settestVariable} />*/}
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
                        <div id="buttonHolder">
                            <button onClick={() => {handleLogin(loginChooser, navigate)}}>Login</button>
                            {loginChooser && <Login displayText="Login with Google" navigate={navigate}/>}
                        </div>
                    </div>
                    <div className='bottom-wrapper'>
                        <div id="signup" className='signup-wrapper'>
                            <p>Don't have an account?</p>
                            <button onClick={() => {setviewChooser(false)}}>Click to get started</button>
                            <br/>
                            <button onClick={() => {navigate('/order')}}>Continue as guest</button>
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
                        <button onClick={() => {handleSignUp(navigate)}}>Sign Up</button>
                        <Login displayText="Sign up with Google" navigate={navigate}/>
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