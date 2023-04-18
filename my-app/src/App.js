import './App.css';
import Header from './common/header/Header';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Pages from './pages/Pages';
import React, { useState } from 'react';
import Cart from './common/cart/Cart';
import Account from './common/account/Account';
import Footer from './common/footer/Footer';
import Login from './common/authentication/Login';
import Registration from './common/authentication/Registration';
import axios from "axios"
import AlertProvider from './provider/AlertProvider';

try{
  axios.defaults.headers.common['token'] = JSON.parse(localStorage.getItem("User")) ? `Bearer ${JSON.parse(localStorage.getItem("User")).token}` : null;
}catch (e){
  console.error("Errore dulrante inserimento del token:", e)
}
function App() {

  const [CartItem, setCartItem] = useState([])
  
  //Elimina oggetto
  const deleteItem = (product) => {
    setCartItem(CartItem.filter((item) => item.id !== product.id))
  }
  //Aggiungi oggetto
  const addToCart = (product) => {

    const productExit = CartItem.find((item) => item.id === product.id)

    if (productExit) {
      setCartItem(CartItem.map((item) =>
      (item.id === product.id ? { ...productExit, qty: productExit.qty + 1 }
        : item)))
    } else {
      // se il prodotto non esiste nel carrello significa che il carrello è vuoto 
      // il nuovo prodotto sarà ggiunto nel carrello  e la sua quantita inizializzata ad 1
      setCartItem([...CartItem, { ...product, qty: 1 }])
    }
  }
  //Rimuovi oggetto
  const decreaseQty = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id)

    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.id !== product.id))
    } else {
      setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty - 1 } : item)))
    }
  }
  
  return (
    <AlertProvider>
      <Router>
        <Header cartItem={CartItem} />
        <Switch>
          <Route path='/' exact>
            <Pages addToCart={addToCart} />
          </Route>
          <Route path='/Login' exact>
            <Login />
          </Route>
          <Route path='/Registration' exact>
            <Registration />
          </Route>
          <Route path='/cart' exact>
            <Cart cartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} deleteItem={deleteItem} />
          </Route>
          <Route path='/account' exact>
            <Account />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </AlertProvider>
  )
}

export default App;
