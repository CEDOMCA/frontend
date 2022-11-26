import React from "react";
import { Form, Button } from 'react-bootstrap';
import { useState } from "react";

export default function HomePage() {
    const [fullName, setName] = useState("");
    const [birthDate, setDate] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const role = "visitor"
    const [message, setMessage] = useState("");

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
          let res = await fetch("https://cedomca-backend.herokuapp.com/user", {
            method: "POST",
            body: JSON.stringify({
              name: fullName,
              birthDate: birthDate,
              email: email,
              password: password,
              country: country,
              state: state,
              city: city,
              role: "visitor"
            }),
          });
          let resJson = await res.json();
          if (res.status === 200) {
            setName("")
            setDate("")
            setEmail("")
            setPassword("")
            setCountry("")
            setState("")
            setCity("")
            setMessage("User created successfully");
            console.log(res);
          } else {
            setMessage("Some error occured");
          }
        } catch (err) {
          console.log(err);
        }
    };
    
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group class="mb-3">
                    <Form.Label class="form-label">Nome Completo</Form.Label>
                    <Form.Control type="text" class="form-control" id="fullName" aria-describedby="emailHelp" value={fullName} onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group class="mb-3">
                    <Form.Label  class="form-label">Data de nascimento</Form.Label>
                    <Form.Control type="date" id="birthDate" value={birthDate} onChange={(e) => setDate(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group class="mb-3">
                    <Form.Label  class="form-label">Senha</Form.Label>
                    <Form.Control type="password" class="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Label class="form-label">País</Form.Label>
                <Form.Select aria-label="Default select example" id="country" value={country} onChange={(e) => setCountry(e.target.value)}>
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
                <Form.Label class="form-label">Estado</Form.Label>
                <Form.Select aria-label="Default select example" id="state" value={state} onChange={(e) => setState(e.target.value)}>
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
                <Form.Label class="form-label">Cidade</Form.Label>
                <Form.Select aria-label="Default select example" id="city" value={city} onChange={(e) => setCity(e.target.value)}>
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
                <Form.Control type="text" class="form-control" id="role" hidden={true} value={role}></Form.Control>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <div className="message">{message ? <p>{message}</p> : null}</div>
            </Form>
        </div>
    );
}