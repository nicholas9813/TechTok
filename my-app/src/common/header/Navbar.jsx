import React, { useState } from "react"
import { Link } from "react-router-dom"

const Navbar = () => {

  const [MobileMenu, setMobileMenu ] = useState(false)

  return (
    <>
      <header className="header">
        <div className='navbar-wrapper'>
          <div className='categories d_flex'>
            <span className='fa-solid fa-border-all'></span>
              <h4>
                Qui puoi trovare<i className='fa fa-chevron-down'></i>
              </h4> 
          </div>

          <div className='navlink'>
            <ul className={MobileMenu ? "nav-links-mobileMenu" : "link f_flex capitalize"} onClick={() => setMobileMenu(false)}>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/account'>Profilo</Link> 
              </li>
            </ul>

            <button className='toggle' onClick={() => setMobileMenu(!MobileMenu)}>
              {
                MobileMenu? <i className='fas fa-times close home-bth'></i> :
                <i className="fa-solid fa-bars open"></i>
                }
            </button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar
