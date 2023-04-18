import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

const LoginMenu = [
  <Dropdown.Item key={"login"} href='/login'>Login</Dropdown.Item>,
  <Dropdown.Item key={"reg"} href='/Registration'>Registrazione</Dropdown.Item>
]

const LoggedMenu = [
  <Dropdown.Item key={"logout"} href='/' onClick={() => { localStorage.removeItem("User") }}>Logout</Dropdown.Item>,
  <Dropdown.Item key={"account"} href='/account'>Profilo</Dropdown.Item>
]

const Search = ({ cartItem }) => {
  const [lista, setLista] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("User")) {
      setLista(LoggedMenu);
    }
    else {
      setLista(LoginMenu);
    }
  }, [])

  window.addEventListener("scroll", function () {
    const search = document.querySelector(".search")
    search.classList.toggle("active", window.scrollY > 100)
  })

  return (
    <>
      <section className='search'>
        <div className='container-custom c_flex'>
          <div className='logo width '>
            <img src="images/logo.png" alt='' />
          </div>


          <div className='icon f_flex width'>
            <div className='user'>
              <Dropdown className='userMenu'>
                <Dropdown.Toggle variant="primary">
                  <i className='fa fa-user icon-circle'></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {
                    lista.map(item => {
                      return item;
                    })
                  }
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <Link to='/cart'>
              <Button variant="primary" className='cart'>
                <i className='fa fa-shopping-bag icon-circle'></i>
                <span>{cartItem.length === 0 ? "" : cartItem.length}</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Search
