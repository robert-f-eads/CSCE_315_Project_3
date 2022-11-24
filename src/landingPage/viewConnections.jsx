import './viewConnections.css';
import Footer from '../sharedComponets/Footer/footer'
import Navbar from '../sharedComponets/Navbar/navbar'
import adv1 from '../assets/sk-first-time.jpg'
import adv2 from '../assets/group-smoothie-shot.jpg'
import logoLong from '../assets/smoothie-king-logo-long.png'

const ViewSwitch = (props) => {
    // eslint-disable-next-line
    const {setPageNum} = props;

    return (
        <>
            <Navbar/>
            <div className='home-page_body'>
                <img src={logoLong} alt='logo header' id='longLogo'/>
                <hr></hr>
                <div className='home-page_advertisement-one'>
                    <img src={adv1} alt='advertisement 1' />
                    <div className='home-page_advertisement-one_info'>
                        <h4 className='message_title'>NEW TO SMOOTHIE KING?</h4>
                        <p className='message_body'>Finding the perfect Smoothie starts with owning your purpose — and we designed a menu 
                            to help you do just that.</p>
                        <a className='page-change-button' href='www.google.com'>Start finding your smoothie</a>
                    </div>
                </div>
                <div className='home-page_advertisement-two'>
                    <div className='home-page_advertisement-two_info'>
                        <h4 className='message_title'>DRINK IT IN</h4>
                        <p className='message_body'>A menu made just for you — with countless combinations of whole fruits, organic veggies and nutritional enhancers
                            for endless ways to Rule The Day.</p>
                        <a className='page-change-button' href='www.google.com'>Create an order</a>
                    </div>
                    <img src={adv2} alt='advertisement 2'/>
                </div>
            </div>

            <div class = "button-holder">
                <button onClick={() => {setPageNum(1)}} type="button">Customer View</button>
                <button onClick={() => {setPageNum(2)}} type="button">Server View</button>
                <button onClick={() => {setPageNum(3)}} type="button">Manager View</button>
            </div>
            <Footer/>
        </>
    )
}

export default ViewSwitch