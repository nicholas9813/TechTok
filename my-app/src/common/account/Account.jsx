import React, { useState } from 'react'
import axios from "axios"
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { withAlert } from '../../provider/AlertProvider';
import { useHistory } from "react-router-dom";

const Account = (props) => {

  const [CVV, setCVV] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [Expire_date, setExpire_date] = useState('')
  const [balance, setBalance] = useState('')
  const history = useHistory();

  const ShowAlert = (msg, type) => {
    props.showAlert(msg, type);
}

  async function submit(events){
    events.preventDefault()
    try{
        await axios.post("http://localhost:3001/api/bank/addCard",{
            CVV,
            cardNumber,
            Expire_date,
            balance
        })
        .then(res=>{
            if(res.data==="Carta inserita"){
              ShowAlert("andato")
              history.push("/");
            }
        })
        .catch(e=>{
          console.log(e)
          if(e.response.data==="Non hai il permesso per farlo e non sei admin"){
            ShowAlert("Non hai il permesso di effettuare questa operazione", "danger")
          }
          if(e.response.data==="Errore"){
            ShowAlert("Errore nell'inserimento dei dati rispetta le seguenti regole, CVV: 3 cifre", "danger")
          }
          else
          ShowAlert("Errore", "danger")
            console.log(e);
        })
    }
    catch(e){
        console.log(e)
    }
}


  return (
    <>
      <Container>
          <h3>Aggiungi Carta</h3>
          <Form>
              <Form.Group className="mb-3" controlId="formBasicCvv">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control placeholder="CVV" onChange={(e) => { setCVV(e.target.value) }} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCNum">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control placeholder="Card Number" onChange={(e) => { setCardNumber(e.target.value) }} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicExpDate">
                  <Form.Label>Expiry Date</Form.Label>
                  <Form.Control type="date" placeholder="Expiry Date" onChange={(e) => { setExpire_date(e.target.value) }} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicBalance">
                  <Form.Label>Balance</Form.Label>
                  <Form.Control placeholder="Balance" onChange={(e) => { setBalance(e.target.value) }} />
              </Form.Group>
              <Button variant="primary" type="submit" onClick={submit}>
                  Invia
              </Button>
          </Form>
      </Container>
    </>
  )
}

export default withAlert(Account)
