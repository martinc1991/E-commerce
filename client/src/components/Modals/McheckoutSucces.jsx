import cookie from 'js-cookie';
import React, { useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { sendEmail, UpdateOrderToFullfilled } from '../../store/actions/checkout_actions';
import s from '../../styles/avisoLoggin.module.css';

const ChackoutSucces = ({ showSuccess, UpdateOrderToFullfilledP, orderModal, sendEmailP, userModal }) => {
	let order = orderModal;
	let ordeID = order.id;
	let user = userModal;

	// console.log(order);

	useEffect(() => {
		UpdateOrderToFullfilledP(ordeID);
		sendEmailP(ordeID, user);
		return;
	}, []);

	const handlerClick = () => {
		window.location = '/';
		cookie.remove('cartItems');
		return;
	};

	return (
		<div>
			<Modal show={showSuccess}>
				<Modal.Header className={s.title}>
					<Modal.Title>Gracias por tu Compra!</Modal.Title>
				</Modal.Header>
				<Modal.Body className={s.cont}>
					<p>Enviamos un correo de confirmacion atu email... Disfruta tu compra !</p>
					<di className={s.button}>
						<Button className={s.button1} onClick={handlerClick}>
							Terminar
						</Button>
					</di>
				</Modal.Body>
			</Modal>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		cartP: state.cart,
		orderP: state.orders,
		userLogin: state.userLogged,
		orderCreatedP: state.orderCreated,
		checkoutP: state.checkout,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		UpdateOrderToFullfilledP: (idOrder) => dispatch(UpdateOrderToFullfilled(idOrder)),
		sendEmailP: (idOrder, user) => dispatch(sendEmail(idOrder, user)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ChackoutSucces);
