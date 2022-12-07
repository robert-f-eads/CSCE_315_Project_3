import '../styles/serverViewButton.css'
import {useNavigate} from 'react-router-dom'

/**
 * @returns a button to navigate to server view
 */
function ServerViewButton() {
    const navigate = useNavigate()
  return (
    <button id="serverViewButton" onClick={() => {navigate('/serverorder')}}>Server View</button>
  );
}

export default ServerViewButton;