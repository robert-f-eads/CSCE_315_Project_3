export default function HomeButton(props) {
    const {setPageNum} = props;

    return (
        <div className="button-holder">
            <button onClick={() => {setPageNum(0)}}>Take me Home</button>
        </div>
    )
}