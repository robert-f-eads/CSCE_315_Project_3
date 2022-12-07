import './landingPage.css';
import {useNavigate} from 'react-router-dom'
import {Navbar, Footer} from '../../sharedComponets'
import {adv1, adv2, LongLogo} from '../../assets'
import { useState } from 'react';

/**
 * Functions and display for the landing page
 * @returns landing page element
 */
const LandingPage = (props) => {
    const navigate = useNavigate()

    return (
        <>
            <Navbar display={true} language={props.language} setLanguage={props.setLanguage}/>
            <div className='home-page_body'>
                <img src={LongLogo} alt='logo header' id='longLogo'/>
                <div className='home-page_advertisement-one'>
                    <img src={adv1} alt='advertisement 1' />
                    <div className='home-page_advertisement-one_info'>
                        <h4 className='message_title'>NEW TO SMOOTHIE KING?</h4>
                        <p className='message_body'>Finding the perfect Smoothie starts with owning your purpose — and we designed a menu 
                            to help you do just that.</p>
                        <button className='page-change-button' onClick={() => {navigate('/login')}}>Start finding your smoothie</button>
                    </div>
                </div>
                <div className='home-page_advertisement-two'>
                    <div className='home-page_advertisement-two_info'>
                        <h4 className='message_title'>DRINK IT IN</h4>
                        <p className='message_body'>A menu made just for you — with countless combinations of whole fruits, organic veggies and nutritional enhancers
                            for endless ways to Rule The Day.</p>
                        <button className='page-change-button' onClick={() => {navigate('/login')}}>Create an order</button>
                    </div>
                    <img src={adv2} alt='advertisement 2'/>
                </div>
            </div>

            <Footer/>
        </>
    )
}

export default LandingPage