import Home from '../components/MainPage/Home'
import ListProduct from '../components/Shops/ListProduct'
import axios from "axios"
import { useState, useEffect } from 'react'

const categoryIcons = {
  'Computer' : 'fas fa-desktop',
  'Elettronica Cuffie' : 'fas fa-microchip',
  'Telefoni e Smartwatch' : 'fas fa-mobile',
  'Mouse e Tastiere' : 'fas fa-mouse-pointer',
  'Monitor e Modem' : 'fas fa-wifi'
}

const Pages = ({ addToCart }) => {
  const [categorie, setCategorie] = useState();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/products/")
        if (response.status === 200) {
          setCategorie(response.data.data)
        }
      } catch (e) {
        console.log(e)
      }
    }
    getCategories()
  }, [])
  return (
    <>
      <Home />
      {
        categorie && categorie.map((item, index) => <ListProduct key={index + 1} id={index + 1} icon={categoryIcons[item.category]} name={item.category} products={item.products} addToCart={addToCart} />)
      }
    </>
  )
}

export default Pages
