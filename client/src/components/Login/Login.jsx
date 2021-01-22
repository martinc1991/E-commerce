import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Button, Form, Container, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { loginAction } from '../../store/actions/loginActions';
import s from '../../styles/loggin.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { LoginModalNoUser, LoginModalAuthError } from '../Modals/LoginModals';

// Google Login
import { GoogleLogin } from 'react-google-login';

const Login = ({ userLoggedP, loginActionP, messageErrorP, checkForEmailP, loggedP, usersP }) => {
	// <-------------------- CONSTANTES Y ESTADOS -------------------->
	const [form, setForm] = useState({
		email: '',
		password: '',
	});
	const history = useHistory();
	const [showModalNoUser, setShowModalNoUser] = useState(false);
	const [showModalAuthError, setShowModalAuthError] = useState(false);
	// useEffect
	useEffect(() => {
		if (loggedP === true) {
			window.location.href = 'http://localhost:3000/';
		}
	}, [loggedP]);
	// console.log(loggedP);
	const url = 'localhost:3001';
	const clientIdCode = '269758003483-2l6nugnundjtidqt2djkq7kt9jptsgh8.apps.googleusercontent.com'; // Google
	// <-------------------- CONSTANTES Y ESTADOS -------------------->

	// <-------------------- FUNCIONES -------------------->
	// Capturar los valores de los inputs
	const handlerInput = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	// Funcion para manejar el submit del formulario
	const handleSubmit = (e) => {
		e.preventDefault();
		// Comprobacion de si el usuario existe o no en la base de datos
		var dontShowModal = true;
		// console.log('probando con cami');
		axios
			.get(`http://${url}/users`)
			.then((res) => {
				// console.log('RES.DATA.DATA');
				// console.log(res.data.data);
				// console.log('FORM');
				// console.log(form);
				// console.log('punto previo');
				res.data.data.forEach((user) => {
					if (user.email === form.email) {
						// console.log('true');
						// loginActionP(form);
						dontShowModal = false;
						loginActionP(form);
						if (userLoggedP && userLoggedP.role === 'admin') {
							// console.log('Entre al if de Admin');
							return history.push('/admin');
						} else {
							return history.push('/');
						}
					}
				});
			})
			.then((res) => {
				// console.log('nada que ver eh');
				if (dontShowModal) setShowModalNoUser(true);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	// <-------------------------- Google Login -------------------------->

	// Si la autenticacion de Google sale bien
	const responseGoogleSuccess = (response) => {
		// console.log(response.profileObj.email);
		// console.log(response.profileObj.googleId);
		var googleForm = {
			email: response.profileObj.email,
			password: response.profileObj.googleId,
		};
		// console.log(googleForm);
		// Comprobacion de si el usuario existe o no en la base de datos
		var dontShowModal = true;
		axios
			.get(`http://${url}/users`)
			.then((res) => {
				// console.log(res.data.data);
				res.data.data.forEach((user) => {
					if (user.email === response.profileObj.email) {
						// console.log('true');
						loginActionP(googleForm);
						dontShowModal = false;
						return;
					}
				});
			})
			.then((res) => {
				if (dontShowModal) setShowModalNoUser(true);
			});
	};

	// Si la autenticacion de Google sale mal
	const responseGoogleFailure = (response) => {
		setShowModalAuthError(true);
	};
	// <-------------------------- Google Login -------------------------->
	// <-------------------- FUNCIONES -------------------->

	return (
		<Container className={`${s.containerPrincipal} ${s.bordeRojo} d-flex flex-row justify-content-center`} onSubmit={handleSubmit}>
			<LoginModalNoUser showModalNoUser={showModalNoUser} setShowModalNoUser={setShowModalNoUser}></LoginModalNoUser>
			<LoginModalAuthError showModalAuthError={showModalAuthError} setShowModalAuthError={setShowModalAuthError}></LoginModalAuthError>

			<Card style={{ width: '30rem' }} className={`${s.loginCard} my-3`}>
				<Card.Body className={`p-3`}>
					<Card.Title className={`text-center`}>Ingresa con tu cuenta</Card.Title>
					<div className={`${s.img} d-flex flex-row justify-content-center my-4`}>
						<FontAwesomeIcon className={s.icon} icon={faUserCircle} size={'7x'} />
					</div>
					<Form className={s.cont_form}>
						{messageErrorP === '' ? <div></div> : <div className={s.messageError}>{messageErrorP}</div>}
						<Form.Group className={s.cont_input} controlId='formBasicEmail'>
							<Form.Control className={s.input} type='email' placeholder='Email' onChange={handlerInput} name='email' />
							<FontAwesomeIcon className={s.icon2} icon={faEnvelope} size={'1x'} />
						</Form.Group>

						<Form.Group className={s.cont_input} controlId='formBasicPassword'>
							<Form.Control className={s.input} type='password' placeholder='Contraseña' onChange={handlerInput} name='password' />
							<FontAwesomeIcon className={s.icon2} icon={faLock} size={'1x'} />
						</Form.Group>
						<Row className={`justify-content-center my-4`}>
							<Link to='/users' className={`text-center`}>
								<p className={s.reg}>Olvidaste tu contraseña?</p>
							</Link>
						</Row>
						<Button className={s.button} type='submit'>
							Ingresar
						</Button>
						<hr></hr>
						<Row className={`justify-content-center`}>
							<Col>
								{/* google login */}
								<GoogleLogin clientId={clientIdCode} buttonText='Ingresar con Google' onSuccess={responseGoogleSuccess} onFailure={responseGoogleFailure} isSignedIn={false} cookiePolicy={'single_host_origin'} className={`w-100 justify-content-center`} />
								{/* google login */}
							</Col>
						</Row>
						<hr></hr>
						<Link to='/users' className={`text-center`}>
							<p className={s.reg}>No tienes una cuenta? Registrate</p>
						</Link>
					</Form>
				</Card.Body>
			</Card>
		</Container>
	);
};

function mapStateToProps(state) {
	return {
		userLoggedP: state.userLogged,
		messageErrorP: state.messageError,
		loggedP: state.logged,
		usersP: state.users,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		loginActionP: (data) => dispatch(loginAction(data)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
