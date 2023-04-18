import React from 'react'
import "./Footer.css"

const Footer = () => {
    return (
      <>
        <footer>
          <div className='container-custom grid2'>
            <div className='footer-box'>
              <h1>TechTok</h1>
              <p>Grazie per aver visitato il nostro sito spero tu abbia trovato ciò di cui hai bisogno</p>
            </div>
            <div className='box1'>
              <h2>Dove siamo</h2>
              <ul>
                <li>Siamo un negozio in via jerusalem 3, Baganzola Pr vienici a trovare e vedi tutte le offerte</li>
              </ul>
            </div>
            <div className='box2'>
              <h2>Contattaci</h2>
              <ul>
                <li>Email: Techtok@techmail.com</li>
                <li>Telefono: +0521 154578</li>
              </ul>
            </div>
          </div>
        </footer>
      </>
    )
  }
  
  export default Footer