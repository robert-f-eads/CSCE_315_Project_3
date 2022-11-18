import './footer.css'

const current = new Date()
const year = current.getFullYear()

const Footer = () => {
    return <>
        <div className='footer-container'>
            <span>&copy; {year} Smoothie King</span>
        </div>
    </>
}

export default Footer