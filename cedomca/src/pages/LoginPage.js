import React from "react";
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const role = "visitor";
    const [message, setMessage] = useState("");

    let handleSubmit = async (e) => {
        e.preventDefault();
        const options = {
            method: "POST",
            mode: "no-cors",
            withCredentials: false,
            body: {
                email: email,
                password: password,
            },
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            }
          };
          try {
            let res = await axios.post("https://cedomca-backend.herokuapp.com/user", options);
          } catch(err) {
            console.log(err)
          }
    };

    return (
        <div>
            <Form onSubmit={handleSubmit} method="POST">
                <Container className="loginBox">
                    <Form.Label class="loginTitle" >Login</Form.Label>
                    <Row>
                        <Form.Group class="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control type="email" placeholder="nome@exemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group class="mb-3">
                            <Form.Control type="password" class="form-control" id="password" placeholder="Digite sua senha"
                            value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                        </Form.Group>
                    </Row>
                    
                    <Form.Control type="text" class="form-control" id="role" hidden={true} value={role} readOnly={true}></Form.Control>
                    <Row>
                        <Button className="buttonSubmit" variant="primary" type="submit">
                            Entrar
                        </Button>
                        <Form.Label class="mb-3">Não possui um cadastro?</Form.Label>
                    </Row>
                </Container>
                
                
                <div className="message">{message ? <p>{message}</p> : null}</div>
            </Form>
        </div>
    );
}