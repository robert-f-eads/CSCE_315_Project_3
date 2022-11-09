import './viewConnections.css';

const ViewSwitch = (props) => {
    const {setPageNum} = props;

    return (
        <div class = "button-holder">
            <button onClick={() => {setPageNum(1)}} type="button">Customer View</button>
            <button onClick={() => {setPageNum(2)}} type="button">Server View</button>
            <button onClick={() => {setPageNum(3)}} type="button">Manager View</button>
        </div>
    )
}

export default ViewSwitch