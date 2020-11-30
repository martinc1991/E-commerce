// React
import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import validate from './validateInfo';


// Bootstrap
import { Container, Card, Form, Button, Col, Row, Alert} from 'react-bootstrap';
import swal from 'sweetalert';

// CSS
import s from '../../styles/FormUsers.module.css';
// Redux
import { connect } from 'react-redux';
// Actions
import { createUser, getUsers } from '../../store/actions/userActions.js';
// <-------------------------------------------------------------->
const url = 'localhost:3001';

const FormUsers = function ({ usersP, createUserP, createUserSuccessP, getUsersP }) {
	const history = useHistory();

const [errors, setErrors] = useState({});
const [show, setShow] = useState(false) // estados de error
//validaciones
const [values, setValues] = useState({
	userName: '',
	userMail: '',
	userPassword: '',
	userPasswordConfirm: ''
	})

	  //******************************************************
	  	//ventana success si la persona se registro

			const registroCorrecto = () =>{
				let name = document.getElementById(`name`).value
				console.log(values);
				swal({
					title: "Bienvenido" + "  " + name,
					text: "Registro completado",
					icon: "success",
					Button: "Ir al Catalogo"
				}).then(function(){
					window.location.href ='http://localhost:3000/login';
				})
			}

	  //*******************************************
	  	//comprobar que password sea iguales

	  ////************************************************

	  	const getUserData = function () {
	  		let name = document.getElementById(`name`).value,
	  			email = document.getElementById(`email`).value,
	  		 password = document.getElementById(`password`).value,
	  		 passwordConfirm = document.getElementById(`passwordConfirm`).value;


	  		let userData = {
	  			name,
	  			email,
	  			password,
	  			role: 'client',
	  		};

	  		return userData;
	  	};

	  //****************************

	  	const createSuccess = function () {
	  		if (createUserSuccessP) {
	  			return
					history.push('/login')

	  		}
	  	};
//**************************************


				  	const aceptarTerminos = function () {
				  		// Funcion para que el boton de submit solo este disponible si se aceptan terminos y condiciones
								var errorValidate = true

								if(Object.keys(errors).length >= 1 ){
									 errorValidate = false;
								}


							if (document.getElementById('terminos').checked && errorValidate ) {
				  			document.getElementById('submitButton').disabled = false;
				  		}
				  		if (!document.getElementById('terminos').checked && !errorValidate) {
				  			document.getElementById('submitButton').disabled = true;
				  		}

							console.log(errorValidate);
							console.log(errors);
				  	};


	  //************************
		// const passValidate = (show) => {
									//
									//  let pass = document.getElementById(`password`).value;
									//  let passConfirm = document.getElementById(`passwordConfirm`).value;
									//  let submitTrue =		document.getElementById('submitButton');
									//  if(pass !== passConfirm){
									// 	 return 	setShow(true);
									// 		 }
									//  if(pass !== passConfirm){
									// 	 return submitTrue.disabled = true;
									//  }

								// }



						//errors


							const handleChange = function(ch){

								setValues({
									...values,
									[ch.target.name]: ch.target.value
								});

								console.log(values);
							}






						console.log(values);
	  	// Funcion que se dispara al hacer submit
	  	const handleSubmit = function (e) {
	  		e.preventDefault();
				setErrors(validate(values));

				if(values.userPassword === values.userPasswordConfirm){
					registroCorrecto()
					var data = getUserData();
		  		createUserP(data);
		  		createSuccess(); // Alert
				}else{
					return 	setShow(true);
				}

	  	};


	  //*****************************************
	  // Aceptar terminos





	return (
		<div className={`${s.contPrincipal} my-4`}>
			<Container>
			 <h1 className={`${s.formTitle}`}>Completa tus datos</h1>
				<Card className={`p-3 m-2 ${s.formCard}`}>
					<Form onSubmit={handleSubmit}>
						<Row>
							<Col lg={12}>
								<h2 className={s.subTitle}>Datos personales</h2>
							</Col>
							<Col lg={12}>
								<Form.Row>
									<Col xs={12} md={6} lg={6}>
										<Form.Group  className={s.grupo}>
											<Form.Control className={`${s.input}`} type='name' name='userName' value={values.userName}  onChange={handleChange}   id={`name`} required />
											<Form.Label className={s.label}>Nombre</Form.Label>
											<span className={s.menssage}>Ingrese su nombre completo</span>
											{errors.userName && <p>{errors.userName}</p>}
										</Form.Group>
									</Col>
									<Col xs={12} md={6} lg={6}>
										<Form.Group  className={s.grupo}>
											<Form.Control className={`${s.input}`} type='email' name='userMail' value={values.userMail}   onChange={handleChange} id={`email`} required />
											<Form.Label className={s.label}>Email</Form.Label>
											<span className={s.menssage}>Asegurate de tener acceso a este email</span>
												{errors.userMail && <p>{errors.userMail}</p>}
										</Form.Group>
									</Col>
								</Form.Row>
							</Col>
						</Row>
						<hr></hr>

						<Row>
							<Col lg={12}>
								<h2 className={s.subTitle}>Datos de la cuenta</h2>
							</Col>
							<Col lg={12}>
								<Form.Row>
									<Col xs={12} md={6} lg={6}>
									<Form.Group  className={s.grupo} >
										<Form.Control className={`${s.input}`} type='password'  name='userPassword' value={values.userPassword}   onChange={handleChange} id={`password`} required />
										<Form.Label className={s.label}>Contraseña</Form.Label>
										<span className={s.menssage}>La contraseña debe contener minimo 8 caracteres y 1 mayuscula</span>
												{errors.userPassword && <p>{errors.userPassword}</p>}
								</Form.Group>

									</Col>
									<Col xs={12} md={6} lg={6}>
									<Form.Group xs={12} md={6} lg={6} className={s.grupo} >
										<Form.Control className={`${s.input}`} type='password' name='userPasswordConfirm' value={values.userPasswordConfirm}  onChange={handleChange} id={`passwordConfirm`} required />
										<Form.Label className={s.label}>Confirma tu contraseña</Form.Label>
										<span className={s.menssage}>Confirme su contraseña</span>
											{errors.userPasswordConfirm && <p>{errors.userPasswordConfirm}</p>}
									</Form.Group>
									</Col>
								</Form.Row>
							</Col>
						</Row>

						<Row className={s.terminos}>
							<Col lg={9}>
								<Form.Group  as={Row}>
									<Form.Check className={`ml-3`} id={`terminos`}  label='Acepto los Términos y Condiciones y autorizo el uso de mis datos de acuerdo a la Declaración de Privacidad.' onClick={aceptarTerminos} />
								</Form.Group>
							</Col>
						</Row>
						<Button className={`${s.botonSubmit}`} id='submitButton' name='botoSubimit'
							 type='submit' disabled={true}>
							Registrarme
						</Button>
								{/*Coincidencia de Contraseñas*/}
							<Alert variant="danger" show={show}>Las contraseñas no coiciden</Alert>

					</Form>
					<hr></hr>
					<Row>
						<Col xs={12}>
							<h2>O ingresa con una cuenta de Google</h2>
						</Col>
						<Col xs={12} className={`d-flex justify-content-center mt-3`}>
							{/* Ingreso por passport */}
							<a href='http://localhost:3001/users/auth/google'>Registrate con Google</a>
						</Col>
					</Row>
				</Card>
			</Container>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		usersP: state.users,
		createUserSuccessP: state.createUserSuccess,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		createUserP: (data) => dispatch(createUser(data)),
		getUsersP: () => dispatch(getUsers()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(FormUsers);
