import './footer.css'

const current = new Date()
const year = current.getFullYear()

/**
 * Functions and display for a footer
 * @returns footer element
 */
const Footer = () => {
    return <>
        <div className='footer-container'>
            <span>&copy; {year} Smoothie King</span>
        </div>
    </>
}

export default Footer