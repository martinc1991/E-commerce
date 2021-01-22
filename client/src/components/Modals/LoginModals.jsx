import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import s from '../../styles/loginModals.module.css';

export const LoginModalNoUser = ({ showModalNoUser, setShowModalNoUser }) => {
	return (
		<div>
			<Modal centered show={showModalNoUser} onHide={() => setShowModalNoUser(false)} dialogClassName='modal-90w' aria-labelledby='example-custom-modal-styling-title' className={`${s.modalContainer}`}>
				<Modal.Header closeButton>
					<Modal.Title className={`${s.modalTitle}`}>El usuario ingresado no se encuentra registrado</Modal.Title>
				</Modal.Header>
				<Modal.Body className={s.cont}>
					<p>Para poder ingresar primero debes registrarte.</p>
					<div className={`${s.contBotones} d-flex flex-column justify-content-center align-items-center`}>
						<Button className={`${s.button1} mt-3`} as={Link} to={`/users`}>
							Crear una cuenta
						</Button>
						<Button className={`${s.button2} mt-3`}>
							{/* Ingreso por passport */}
							<a href='http://localhost:3001/users/auth/google'>Registrarse con Google</a>
						</Button>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
};

export const LoginModalAuthError = ({ showModalAuthError, setShowModalAuthError }) => {
	return (
		<div>
			<Modal centered show={showModalAuthError} onHide={() => setShowModalAuthError(false)} dialogClassName='modal-90w' aria-labelledby='example-custom-modal-styling-title' className={`${s.modalContainer}`}>
				<Modal.Header className={s.title} closeButton>
					<Modal.Title className={`${s.modalTitle}`}>Hubo en error con tus credenciales de Google</Modal.Title>
				</Modal.Header>
				<Modal.Body className={s.cont}>
					<p>Por favor, intentalo de nuevo</p>
					<div className={`${s.contBotones} d-flex flex-column justify-content-center align-items-center`}>
						<Button className={s.button1} onClick={() => setShowModalAuthError(false)}>
							Entendido
						</Button>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
};
