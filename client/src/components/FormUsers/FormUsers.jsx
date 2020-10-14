// React
import axios from 'axios';
import React from 'react';

// Bootstrap
import { Container, Card, Form, Button, Col, Row } from 'react-bootstrap';

// CSS
import s from '../../styles/FormUsers.module.css';

const url = 'localhost:3001';

export default function FormUsers() {
	const getUserData = function () {
		let nombre = document.getElementById(`nombre`).value,
			apellido = document.getElementById(`apellido`).value,
			dni = document.getElementById(`dni`).value,
			email = document.getElementById(`email`).value,
			direccion = document.getElementById(`direccion`).value,
			provincia = document.getElementById(`provincia`).value,
			ciudad = document.getElementById(`ciudad`).value,
			codPostal = document.getElementById(`codPostal`).value,
			userName = document.getElementById(`userName`).value,
			password = document.getElementById(`password`).value,
			passwordConfirm = document.getElementById(`passwordConfirm`).value,
			terminos = document.getElementById(`terminos`).checked;

		let userData = {
			nombre,
			apellido,
			dni,
			email,
			direccion,
			provincia,
			ciudad,
			codPostal,
			userName,
			password,
			passwordConfirm,
			terminos: terminos,
		};
		console.log(userData);
		return userData;
	};

	const sendUserData = function (userData) {
		// axios.post(`http://${url}/products`, userData).then((res) => {
		// 	console.log('usuario creado correctamente');
		// 	console.log(res);
		// });
		console.log('funciono');
		console.log(userData);
	};

	const handleSubmit = function () {
		// Algo
		var data = getUserData();
		if (data.password != data.passwordConfirm) {
			return alert('las contras no coinciden');
		}
		sendUserData(data);
	};

	const aceptarTerminos = function () {
		// console.log('anda');
		// console.log(document.getElementById('terminos').checked);
		if (document.getElementById('terminos').checked) {
			document.getElementById('submitButton').disabled = false;
		}
		if (!document.getElementById('terminos').checked) {
			document.getElementById('submitButton').disabled = true;
		}
	};

	return (
		<div>
			<Container>
				<Card className={`p-3 ${s.formCard}`}>
					<h1>Registrate</h1>
					<Form onSubmit={handleSubmit}>
						<Row>
							<Col lg={3}>
								<h2>Datos personales</h2>
							</Col>
							<Col lg={9}>
								<Form.Row>
									<Form.Group as={Col}>
										<Form.Label>Nombre</Form.Label>
										<Form.Control type='text' placeholder='Nombre' id={`nombre`} required />
									</Form.Group>

									<Form.Group as={Col}>
										<Form.Label>Apellido</Form.Label>
										<Form.Control type='text' placeholder='Apellido' id={`apellido`} required />
									</Form.Group>

									<Form.Group as={Col}>
										<Form.Label>DNI</Form.Label>
										<Form.Control type='number' placeholder='DNI' id={`dni`} required />
									</Form.Group>
								</Form.Row>
								<Form.Row>
									<Form.Group as={Col}>
										<Form.Label>Email</Form.Label>
										<Form.Control type='email' placeholder='Email' id={`email`} required />
									</Form.Group>
								</Form.Row>
								<Form.Group>
									<Form.Label>Direccion</Form.Label>
									<Form.Control placeholder='1234 Main St' id={`direccion`} required />
								</Form.Group>

								<Form.Row>
									<Form.Group as={Col}>
										<Form.Label>Estado o Provincia</Form.Label>
										<Form.Control as='text' placeholder='Provincia' id={`provincia`} required></Form.Control>
									</Form.Group>

									<Form.Group as={Col}>
										<Form.Label>Ciudad</Form.Label>
										<Form.Control type='text' placeholder='Ciudad' id={`ciudad`} required />
									</Form.Group>

									<Form.Group as={Col}>
										<Form.Label>Codigo Postal</Form.Label>
										<Form.Control type='number' id={`codPostal`} required />
									</Form.Group>
								</Form.Row>
							</Col>
						</Row>

						<Row>
							<Col lg={3}>
								<h2>Datos de la cuenta</h2>
							</Col>
							<Col lg={9}>
								<Form.Row>
									<Form.Group as={Col}>
										<Form.Label>Nombre de usuario</Form.Label>
										<Form.Control type='text' placeholder='Enter email' id={`userName`} required />
									</Form.Group>
								</Form.Row>

								<Form.Row>
									<Form.Group as={Col}>
										<Form.Label>Contraseña</Form.Label>
										<Form.Control type='password' placeholder='Password' id={`password`} required />
									</Form.Group>
									<Form.Group as={Col}>
										<Form.Label>Confirma tu contraseña</Form.Label>
										<Form.Control type='password' placeholder='Password' id={`passwordConfirm`} required />
									</Form.Group>
								</Form.Row>
							</Col>
						</Row>

						<Row>
							<Form.Group as={Row}>
								<Col>
									<Form.Check id={`terminos`} label='Acepto los terminos y condiciones' onClick={aceptarTerminos} />
								</Col>
							</Form.Group>
						</Row>

						<Button id='submitButton' className={``} variant='primary' type='submit' disabled={true}>
							Registrarme
						</Button>
					</Form>
				</Card>
			</Container>
		</div>
	);
}
