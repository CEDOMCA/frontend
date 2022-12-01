import React from "react";
import { Form, Button, Row, Container } from 'react-bootstrap';
import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let handleSubmit = async (e) => {
        e.preventDefault();
        const options = {
            email: email,
            password: password,
          };
          try {
            let res = await axios.post("https://cedomca-backend.herokuapp.com/auth/login", options);
          } catch(err) {
            console.log(err)
          }
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Container className="loginBox">
                <p class="text-center" id="titletLogin">Login</p>
                    <Row>
                        <Form.Group class="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control type="email" placeholder="nome@exemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group class="mb-3">
                            <Form.Control type="password" class="form-control" id="password" placeholder="Digite sua senha"
                            value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                        </Form.Group>
                    </Row>
                    
                    <Row id="rowButton">
                        <Button variant="primary" type="submit" >
                            Entrar
                        </Button>
                        
                    </Row>
                    <a href="/register" class="text-decoration-none">Não possui um cadastro?</a>
                </Container>
            </Form>
        </div>
    );
}