import React from "react";
import { Form, Button, Col, Row } from 'react-bootstrap';
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HomePage() {
    const [fullName, setName] = useState("");
    const [birthDate, setDate] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const role = "visitor";
    const [message, setMessage] = useState("");
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    useEffect(() => {
        console.log(selectedCountry);
        console.log(selectedCountry?.isoCode);
        console.log(State?.getStatesOfCountry(selectedCountry?.isoCode));
    }, [selectedCountry]);

    let handleSubmit = async (e) => {
        e.preventDefault();
        const options = {
            method: "POST",
            mode: "no-cors",
            withCredentials: false,
            body: {
                fullName: fullName,
                birthDate: birthDate,
                email: email,
                password: password,
                country: selectedCountry.name,
                state: selectedState.name,
                city: selectedCity.name,
                role: role
            },
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        };
        try {
            let res = await axios.post("https://cedomca-backend.herokuapp.com/user", options);
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group class="mb-3">
                            <Form.Label class="form-label">Nome Completo</Form.Label>
                            <Form.Control type="text" class="form-control" id="fullName" aria-describedby="emailHelp" value={fullName} onChange={(e) => setName(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group class="mb-3">
                            <Form.Label class="form-label">Data de nascimento</Form.Label>
                            <Form.Control type="date" id="birthDate" value={birthDate} onChange={(e) => setDate(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label class="form-label">Estado</Form.Label>
                            <Select
                                options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
                                getOptionLabel={(options) => {
                                    return options["name"];
                                }}
                                getOptionValue={(options) => {
                                    return options["name"];
                                }}
                                value={selectedState}
                                onChange={(item) => {
                                    setSelectedState(item);
                                }}
                            />
                        </Form.Group>

                    </Col>
                    <Col>

                        <Form.Group class="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group class="mb-3">
                            <Form.Label class="form-label">País</Form.Label>
                            <Select
                                options={Country.getAllCountries()}
                                getOptionLabel={(options) => {
                                    return options["name"];
                                }}
                                getOptionValue={(options) => {
                                    return options["name"];
                                }}
                                value={selectedCountry}
                                onChange={(item) => {
                                    setSelectedCountry(item);
                                }}
                            />
                        </Form.Group>

                        <Form.Group class="mb-3">
                            <Form.Label class="form-label">Cidade</Form.Label>
                            <Select
                                options={City.getCitiesOfState(
                                    selectedState?.countryCode,
                                    selectedState?.isoCode
                                )}
                                getOptionLabel={(options) => {
                                    return options["name"];
                                }}
                                getOptionValue={(options) => {
                                    return options["name"];
                                }}
                                value={selectedCity}
                                onChange={(item) => {
                                    setSelectedCity(item);
                                }}
                            />
                        </Form.Group>
                        <Form.Control type="text" class="form-control" id="role" hidden={true} value={role}></Form.Control>
                    </Col>
                </Row>
                <Form.Group class="mb-3">
                    <Form.Label class="form-label">Senha</Form.Label>
                    <Form.Control type="password" class="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <div className="message">{message ? <p>{message}</p> : null}</div>
            </Form>
        </div>
    );
}