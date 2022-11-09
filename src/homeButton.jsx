export default function HomeButton(props) {
    const {setPageNum} = props;

    return (
        <div class="button-holder">
            <button onClick={() => {setPageNum(0)}}>Take me Home</button>
        </div>
    )
}