import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import "./Auth.css"
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { withAlert } from '../../provider/AlertProvider';
import { useHistory } from "react-router-dom";

const Login = (props) => {
    const ShowAlert = (msg, type) => {
        props.showAlert(msg, type);
    }
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory();

    async function submit(e) {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3001/api/auth/login", {
                username,
                password
            }).then(res => {
                if (res.data.logged) {
                    localStorage.setItem("User", JSON.stringify({ username: username, password: password, token: res.data.token }))
                    ShowAlert("Loggato")
                    history.push("/");
                }
            }).catch(e => {
                if (e.response.data === "Username sbagliato") {
                    ShowAlert("Username Sbagliato", "warning")
                }
                else if (e.response.data === "Password Sbagliata") {
                    ShowAlert("Password Sbagliata", "warning")
                }
                else if (e.response.data === "Errore") {
                    ShowAlert("Errore", "danger")
                }
                console.log(e);
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Container>
            <h3>Accedi</h3>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control placeholder="Username" onChange={(e) => { setUsername(e.target.value) }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={submit}>
                    Invia
                </Button>
            </Form>
            <p>Se non hai un Account</p>
            <Link to="/Registration">Registrati</Link>
        </Container>
    )
}

export default withAlert(Login)