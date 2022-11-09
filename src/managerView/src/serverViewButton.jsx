import '../styles/serverViewButton.css'

function ServerViewButton() {
  return (
    <button id="serverViewButton" onClick={() => {switchToServerView()}}>Server View</button>
  );
}

function switchToServerView() {
  console.log("Switching to server view.");
}

export default ServerViewButton;