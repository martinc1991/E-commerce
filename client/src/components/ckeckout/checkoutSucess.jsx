import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../multimedia/logo.png';
import { addToCart, deleteCart, removeFromCart, updateFromCart } from '../../store/actions/cart_actions';
import { confirmOrder, CreateOrder, deleteOrderCart, UpdateOrderToFullfilled, UpdateOrderToProcessStatus, UpdateOrderToreject } from '../../store/actions/checkout_actions';
import { getOrders } from '../../store/actions/order_actions';
import s from '../../styles/carrito.module.css';
import ChackoutSucces from '../Modals/McheckoutSucces';

const CheckoutSucess = ({ cartP, UpdateOrderTorejectP, checkoutP, UpdateOrderToFullfilledP, orderCreatedP, getOrdersP, orderP, userLogin }) => {
	const [reject, setReject] = useState(false);
	//let product = orderCreatedP ? orderCreated.products : []
	let checkoutEnd = checkoutP;
	let orderRender = orderP && orderP.filter((x) => x.id === orderCreatedP.id);
	// let objender = orderRender[0];
	// let products = objender && objender.products
	// let orderP2 =  orderP.length < 1? [] :  orderP[0].products
	// const  qty = location.search.split('=')[1]

	// console.log(userLogin)

	/********** USEEFECT *********** */
	useEffect(() => {
		getOrdersP();
		setTimeout(() => {
			setReject(true);
		}, 3000);
	}, []);
	/********** USEEFECT *********** */
	// let history = useHistory()
	// console.log(reject)
	// console.log(reject)
	// const handlerClick = () => {
	//     alert('Enviamos un correo de confirmacion a tu email!!!')
	//     UpdateOrderToFullfilledP(orderCreatedP.id)
	//     window.location = '/'
	//     return
	// }

	// const handlerClickReject = () => {
	//     UpdateOrderTorejectP(orderCreatedP.id)
	//     //history.push('/paymethod')
	//     return
	// }

	return (
		<div>
			{reject ? (
				<div className={`${s.cont_prin} my-3`}>
					<div className={s.cont1}>
						<img className={`${s.logo}`} src={logo}></img>
						<ul>
							<h1>{checkoutEnd ? 'Compra ok !!' : 'Ah ocurrido un error al enviar el pago.!'}</h1>
						</ul>
					</div>
					<Container className={s.contFormPay}>
						<h1>{checkoutEnd ? '' : 'Compra fallida'}</h1>
					</Container>
					<div className={s.cont_button1}>
						{/* <Button className={s.buttonF} >Finalizar compra</Button>{"    "} */}
						{checkoutEnd ? (
							<div></div>
						) : (
							<Button className={s.buttonFC} as={Link} to={'/paymethod'}>
								intentar nuevamente
							</Button>
						)}
					</div>
				</div>
			) : (
				<div className={`${s.cont_prin} my-3`}>
					<h1>Procesando ....</h1>
				</div>
			)}
			{/* < Navegacion linksU={enlacesUserSinAdmin} linksA={enlacesUserConAdmin} showSearchbar={false}/> */}
			<ChackoutSucces showSuccess={checkoutEnd} orderModal={orderCreatedP} userModal={userLogin} />
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
		addToCartP: (id, qty) => dispatch(addToCart(id, qty)),
		removeFromCartP: (id) => dispatch(removeFromCart(id)),
		updateFromCartP: (id, qty) => dispatch(updateFromCart(id, qty)),
		deleteCartP: () => dispatch(deleteCart()),
		getOrdersP: () => dispatch(getOrders()),
		CreateOrderP: (cartP2, userId) => dispatch(CreateOrder(cartP2, userId)),
		UpdateOrderToProcessStatusP: (id, data) => dispatch(UpdateOrderToProcessStatus(id, data)),
		deleteOrderCartP: (id) => dispatch(deleteOrderCart(id)),
		confirmOrderP: (id, total, OrderId) => dispatch(confirmOrder(id, total, OrderId)),
		UpdateOrderToFullfilledP: (idOrder) => dispatch(UpdateOrderToFullfilled(idOrder)),
		UpdateOrderTorejectP: (id) => dispatch(UpdateOrderToreject(id)),
		//deleteOrderCartP : (id, status) => dispatch(deleteOrderCart(id, status))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutSucess);
