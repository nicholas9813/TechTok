import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { withAlert } from '../../provider/AlertProvider';
import { useHistory } from "react-router-dom";

function Registration(props){
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[username,setUsername]=useState('')
    const history = useHistory();


    const ShowAlert = (msg, type) => {
        props.showAlert(msg, type);
    }
    async function submit(e){
        e.preventDefault();
        try{

            await axios.post("http://localhost:3001/api/auth/register",{
                email,
                password,
                username
            })
            .then(res=>{
                if(res.data==="savedUser"){
                    localStorage.setItem("User", JSON.stringify({username: username, password: password, token: res.data.token}))
                    ShowAlert("Registrato con successo")
                    history.push("/");
                }

            })
            .catch(e=>{
                if(e.response.data==="inserimento errato"){
                    ShowAlert("Email o password inserita errata", "danger")
                  }
                else if(e.response.data==="Errore"){
                    ShowAlert("Utente già esistente", "danger")
                }
                else 
                    ShowAlert("Qualcosa è andato storto", "danger")
                console.log(e);
            })
        }
        catch(e){
            console.log(e)
        }
    }

    return (
        <Container>
            <h3>Registrazione</h3>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicUser">
                    <Form.Label>Username</Form.Label>
                    <Form.Control placeholder="Username" onChange={(e) => { setUsername(e.target.value) }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={submit}>
                    Invia
                </Button>
            </Form>
            <p>Hai già un Account</p>
            <Link to="/Login">Accedi</Link>
        </Container>
    )
}
export default withAlert(Registration)