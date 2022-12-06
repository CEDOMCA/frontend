import {
  Form, Button, Col, Row, Container,
} from 'react-bootstrap';
import React, { CSSProperties, useEffect, useState } from 'react';
import { Country, State, City } from 'country-state-city';
import Select from 'react-select';
import axios from 'axios';
import './SignUp.css';

export default function SignUp() {
  const role = 'visitor';
  const [message, setMessage] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  const findFormErrors = () => {
    const {
      name, birthDate, email, password, confirmPassword,
    } = form;
    const newErrors = {};
    // name errors
    if (!name || name === '') newErrors.name = 'Nome obrigatório';
    // food errors
    if (!birthDate || birthDate === '') newErrors.birthDate = 'Data de nascimento obrigatório';
    // rating errors
    if (!email || email === '') newErrors.email = 'Email obrigatório';
    // comment errors
    if (!password || password === '') newErrors.password = 'Senha obrigatório';
    else if (password.length > 18) newErrors.password = 'Senha muito longa! Sua senha deve conter entre 8 e 18 caracteres';
    else if (password.length < 8) newErrors.password = 'Senha muito curta! Sua senha deve conter entre 8 e 18 caracteres';

    if (!confirmPassword || confirmPassword === '') newErrors.confirmPassword = 'Confirmar senha obrigatório';
    else if (confirmPassword !== password) newErrors.confirmPassword = 'As senhas devem ser igual';

    return newErrors;
  };

  useEffect(() => {
    console.log(selectedCountry);
    console.log(selectedCountry?.isoCode);
    console.log(State?.getStatesOfCountry(selectedCountry?.isoCode));
  }, [selectedCountry]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const options = {
        fullName: form.name,
        birthDate: form.birthDate,
        email: form.email,
        password: form.password,
        country: selectedCountry.name,
        state: selectedState.name,
        city: selectedCity.name,
        role,
      };
      try {
        const res = await axios.post('https://cedomca-backend.herokuapp.com/users', options);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Container bsPrefix="registerContainer">
      <h3 className="text-center">Cadastro</h3>
      <Form onSubmit={handleSubmit} class="text-white">
        <Row>
          <Col>
            <Form.Group class="mb-3">
              <Form.Label class="form-label">Nome Completo</Form.Label>
              <Form.Control type="text" class="form-control" id="fullName" aria-describedby="emailHelp" onChange={(e) => setField('name', e.target.value)} isInvalid={!!errors.name} />
              <Form.Control.Feedback type="invalid">
                { errors.name }
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group class="mb-3">
              <Form.Label class="form-label">Data de nascimento</Form.Label>
              <Form.Control type="date" id="birthDate" onChange={(e) => setField('birthDate', e.target.value)} isInvalid={!!errors.birthDate} />
              <Form.Control.Feedback type="invalid">
                { errors.birthDate }
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label class="form-label">Estado</Form.Label>
              <Select
                options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
                getOptionLabel={(options) => options.name}
                getOptionValue={(options) => options.name}
                value={selectedState}
                onChange={(item) => {
                  setSelectedState(item);
                }}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary25: 'primary50',
                    primary: 'black',
                  },
                })}
              />
            </Form.Group>

          </Col>
          <Col>

            <Form.Group class="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" onChange={(e) => setField('email', e.target.value)} isInvalid={!!errors.email} />
              <Form.Control.Feedback type="invalid">
                { errors.email }
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group class="mb-3">
              <Form.Label class="form-label">País</Form.Label>
              <Select
                options={Country.getAllCountries()}
                getOptionLabel={(options) => options.name}
                getOptionValue={(options) => options.name}
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
                  selectedState?.isoCode,
                )}
                getOptionLabel={(options) => options.name}
                getOptionValue={(options) => options.name}
                value={selectedCity}
                onChange={(item) => {
                  setSelectedCity(item);
                }}
              />
            </Form.Group>
            <Form.Control type="text" class="form-control" id="role" hidden value={role} />
          </Col>
        </Row>
        <Row id="passwordBox">
          <Form.Group class="mb-3">
            <Form.Label class="form-label">Senha</Form.Label>
            <Form.Control type="password" class="form-control" id="password" onChange={(e) => setField('password', e.target.value)} isInvalid={!!errors.password} />
            <Form.Control.Feedback type="invalid">
              { errors.password }
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group class="mb-3">
            <Form.Label class="form-label">Confirmar Senha</Form.Label>
            <Form.Control type="password" class="form-control" id="password" onChange={(e) => setField('confirmPassword', e.target.value)} isInvalid={!!errors.confirmPassword} />
            <Form.Control.Feedback type="invalid">
              { errors.confirmPassword }
            </Form.Control.Feedback>
            <div className="message">{message ? <p>{message}</p> : null}</div>
          </Form.Group>
          <Button variant="primary" type="submit" id="registerButton">
            Cadastre-se
          </Button>
        </Row>
      </Form>
    </Container>
  );
}
