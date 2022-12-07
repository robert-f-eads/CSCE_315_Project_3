import './navbar.css'
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'
import {StoreLocate} from '../../connectingViews'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'

const Navbar = (props) => {
    const [mapDisplay, setMapDisplay] = useState(false)
    const navigate = useNavigate()

    return <>
        <div className='navbar-container'>
            <div style={{'marginRight': '1%'}}>
                <FormControl style={{'width': '100px'}}>
                    <InputLabel id="languageSelectorLabel">Language</InputLabel>
                    <Select
                        labelId="languageSelectorLabel"
                        id="languageSelector"
                        value={props.language}
                        label="Language"
                        onChange={(event) => {props.setLanguage(event.target.value)}}
                        defaultValue={'en'}
                        variant='standard'
                        autoWidth
                    >
                        <MenuItem value={'en'}>en</MenuItem>
                        <MenuItem value={'es'}>es</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className='navbar-container_buttons'>
                <button onClick={() => {setMapDisplay(true)}}>Locate our Store</button>
                {props.display 
                ? <button id="login" onClick={() => {navigate('/login')}}>Login</button> 
                : <button id="login" onClick={() => {navigate('/')}}>Go Home</button>}
            </div>
        </div>
        {mapDisplay && <StoreLocate  mapFunc={setMapDisplay}/>}
    </>
}

export default Navbar