// React
import React from 'react';

// Axios
import axios from 'axios';

// Bootstrap
import { Container, Card, Form, Button, Col, Row } from 'react-bootstrap';

// CSS
import s from '../../styles/FormUsers.module.css';

const url = 'localhost:3001';

export default function FormUsers() {
	const getUserData = function () {
		let nombre = document.getElementById(`nombre`).value,
			apellido = document.getElementById(`apellido`).value,
			telefono = document.getElementById(`telefono`).value,
			dni = document.getElementById(`dni`).value,
			email = document.getElementById(`email`).value,
			fechaNacimiento = document.getElementById(`fechaNacimiento`).value,
			direccion = document.getElementById(`direccion`).value,
			pais = document.getElementById(`pais`).value,
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
			telefono,
			dni,
			email,
			fechaNacimiento,
			direccion,
			pais,
			provincia,
			ciudad,
			codPostal,
			userName,
			password,
			passwordConfirm,
			terminos: terminos,
			role: 'user',
		};
		console.log(userData);
		return userData;
	};

	const sendUserData = function (userData) {
		// Aca va la peticion POST que se manda al servidor para crear el usuario en la base de datos
		// axios.post(`http://${url}/users`, userData).then((res) => {
		// 	console.log('usuario creado correctamente');
		// 	console.log(res);
		// });
		console.log('funciono');
		console.log(userData);
	};

	const handleSubmit = function (e) {
		// Algo
		e.preventDefault();
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
				<Card className={`p-3 m-2 ${s.formCard}`}>
					<h1 className={`${s.formTitle}`}>Registrate</h1>
					<Form onSubmit={handleSubmit}>
						<hr></hr>
						<Row>
							<Col lg={3}>
								<h2>Datos personales</h2>
							</Col>

							<Col lg={9}>
								<Form.Row>
									<Form.Group as={Col}>
										<Form.Label>Nombre</Form.Label>
										<Form.Control className={`${s.input}`} type='text' placeholder='Nombre' id={`nombre`} required />
									</Form.Group>

									<Form.Group as={Col}>
										<Form.Label>Apellido</Form.Label>
										<Form.Control className={`${s.input}`} type='text' placeholder='Apellido' id={`apellido`} required />
									</Form.Group>

									<Form.Group as={Col}>
										<Form.Label>DNI</Form.Label>
										<Form.Control className={`${s.input}`} type='number' placeholder='DNI' id={`dni`} required />
									</Form.Group>
								</Form.Row>
								<Form.Row>
									<Col lg={4}>
										<Form.Group>
											<Form.Label>Numero de Telefono</Form.Label>
											<Form.Control className={`${s.input}`} type={'tel'} placeholder='Numero de Telefono' id={`telefono`} required />
										</Form.Group>
									</Col>
									<Col>
										<Form.Group>
											<Form.Label>Email</Form.Label>
											<Form.Control className={`${s.input}`} type='email' placeholder='Email' id={`email`} required />
										</Form.Group>
									</Col>
								</Form.Row>

								<Form.Row>
									<Col lg={4}>
										<Form.Group>
											<Form.Label>Fecha de Nacimiento</Form.Label>
											<Form.Control className={`${s.input}`} type='date' placeholder='' id={`fechaNacimiento`} required />
										</Form.Group>
									</Col>
								</Form.Row>
							</Col>
						</Row>
						<hr></hr>
						<Row>
							<Col lg={3}>
								<h2>Domicilio</h2>
							</Col>
							<Col lg={9}>
								<Form.Row>
									<Col lg={7}>
										<Form.Group>
											<Form.Label>Direccion</Form.Label>
											<Form.Control className={`${s.input}`} placeholder='1234 Main St' id={`direccion`} required />
										</Form.Group>
									</Col>
									<Col lg={5}>
										<Form.Group>
											<Form.Label>Pais</Form.Label>
											<Form.Control className={`${s.input}`} type='text' placeholder='Pais' id={`pais`} required />
										</Form.Group>
									</Col>
								</Form.Row>

								<Form.Row>
									<Col lg={4}>
										<Form.Group>
											<Form.Label>Ciudad</Form.Label>
											<Form.Control className={`${s.input}`} type='text' placeholder='Ciudad' id={`ciudad`} required />
										</Form.Group>
									</Col>
									<Col lg={4}>
										<Form.Group>
											<Form.Label>Estado o Provincia</Form.Label>
											<Form.Control className={`${s.input}`} type='text' placeholder='Provincia' id={`provincia`} required></Form.Control>
										</Form.Group>
									</Col>
									<Col lg={4}>
										<Form.Group>
											<Form.Label>Codigo Postal</Form.Label>
											<Form.Control className={`${s.input}`} type='number' id={`codPostal`} required />
										</Form.Group>
									</Col>
								</Form.Row>
							</Col>
						</Row>
						<hr></hr>
						<Row>
							<Col lg={3}>
								<h2>Datos de la cuenta</h2>
							</Col>
							<Col lg={9}>
								<Form.Row>
									<Form.Group as={Col}>
										<Form.Label>Nombre de usuario</Form.Label>
										<Form.Control className={`${s.input}`} type='text' placeholder='Enter email' id={`userName`} required />
									</Form.Group>
								</Form.Row>

								<Form.Row>
									<Form.Group as={Col}>
										<Form.Label>Contraseña</Form.Label>
										<Form.Control className={`${s.input}`} type='password' placeholder='Password' id={`password`} required />
									</Form.Group>
									<Form.Group as={Col}>
										<Form.Label>Confirma tu contraseña</Form.Label>
										<Form.Control className={`${s.input}`} type='password' placeholder='Password' id={`passwordConfirm`} required />
									</Form.Group>
								</Form.Row>
							</Col>
						</Row>

						<Row>
							<Col lg={3}></Col>
							<Col lg={9}>
								<Form.Group as={Row}>
									<Form.Check className={`ml-3 ${s.input}`} id={`terminos`} label='Acepto los terminos y condiciones' onClick={aceptarTerminos} />
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col lg={3}></Col>
							<Col lg={9}>
								<Button className={`${s.botonSubmit}`} id='submitButton' type='submit' disabled={true}>
									Registrarme
								</Button>
							</Col>
						</Row>
					</Form>
				</Card>
			</Container>
		</div>
	);
}
