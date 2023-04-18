import React, { useState } from 'react'
import "./style.css"
import { Modal } from 'antd';
import axios from "axios"
import { withAlert } from '../../provider/AlertProvider';
import { useHistory } from "react-router-dom";

const { confirm } = Modal;

const Cart = ({ cartItem, addToCart, decreaseQty, deleteItem, showAlert }) => {
  const history = useHistory();
  const payment = cartItem.reduce((price, item) => price + item.qty * item.price, 0)

  const ShowAlert = (msg, type) => {
    showAlert(msg, type);
  }

  const [CVV, setCVV] = useState('')
  const [cardNumber, setCardNumber] = useState('')

  async function submit() {
    try {
      await axios.post("http://localhost:3001/api/bank/payment", {
        CVV,
        cardNumber,
        payment
      }).then(res => {
        if (res.data.message === "Pagamento effettuato con successo") {
          console.log("pagamento")
          ShowAlert("Pagamento andato a buon fine")
          history.push("/");
        }
      }).catch(e => {
        if (e.response.data === "fondi insufficenti"){
          console.log("ciao")
          ShowAlert("Pagamento non possibile controlla il tuo conto", "danger")
        } else if (e.response.data === "Carta di credito non trovata") {
          ShowAlert("Carta non trovata", "warning")
        } else {
          ShowAlert("Errore nel pagamento", "danger")
        }
      })
    }
    catch (e) {
      console.log(e)
    }
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    if (localStorage.getItem("User"))
      setIsModalOpen(true);
    else {
      confirm({
        title: 'Impossibile effettuare il pagamento',
        content: 'Devi essere loggato o registrato',
        okText: 'Login',
        cancelText: 'Registrati',
        onOk() {
          window.location = "/login"
        },
        onCancel() {
          window.location = "/Registration"
        },
      });
    }
  };
  const handleOk = () => {
    submit()
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <section className='cart-items'>
        <div className="cart-page-wrapper">
          <div className="cart-panel cart-details">
            {cartItem.length === 0 && <h1 className='no-items'>Non ci sono oggetti nel carrello</h1>}

            {cartItem.map((item) => {
              const productQty = item.price * item.qty
              return (
                <div className='cart-list' key={item.id}>
                  <img className='img' src={"./images/products/" + item.img + ".png"} alt='' />
                  <div className='cart-info'>
                    <h3>{item.name}</h3>
                    <h4>
                      €{item.price}.00 * {item.qty}
                      <span>€{productQty}.00</span>
                    </h4>
                  </div>
                  <div className='cart-items-function'>
                    <div className='removeCart' onClick={() => deleteItem(item)}>
                      <button className='removeCart'>
                        <i className='fa-solid fa-xmark'></i>
                      </button>
                    </div>
                    <div className='cartControl d_flex'>
                      <button className='incCart' onClick={() => addToCart(item)}>
                        <i className='fa-solid fa-plus'></i>
                      </button>
                      <button className='desCart' onClick={() => decreaseQty(item)}>
                        <i className='fa-solid fa-minus'></i>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className='cart-panel cart-total'>
            <h2>Riassunto carrello</h2>
            <div className='cart-price-wrapper'>
              <h4>prezzo totale :</h4>
              <h3>${payment}.00</h3>
            </div>
            <div className='cart-payment'>
              <button className='Pay' onClick={showModal}>
                <h1>Paga</h1>
                <i className='fa-regular fa-credit-card'></i>
              </button>
              <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText={'Paga'}>
                <form action='POST'>
                  <input type="CVV" onChange={(e) => { setCVV(e.target.value) }} placeholder="CVV" />
                  <input type="CardNumber" onChange={(e) => { setCardNumber(e.target.value) }} placeholder="CardNumber" />
                  <h3 >${payment}.00</h3>
                </form>
              </Modal>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default withAlert(Cart)