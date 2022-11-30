import '../styles/serverViewButton.css'
import {useNavigate} from 'react-router-dom'

function ServerViewButton() {
    const navigate = useNavigate()
  return (
    <button id="serverViewButton" onClick={() => {navigate('/serverorder')}}>Server View</button>
  );
}

export default ServerViewButton;