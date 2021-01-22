import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { default as Cookie, default as cookie } from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import logo from '../../multimedia/logo.png';
import { addToCart, deleteCart, removeFromCart, updateFromCart } from '../../store/actions/cart_actions';
import { confirmOrder, CreateOrder, deleteOrderCart, sendEmail, UpdateOrderToFullfilled, UpdateOrderToProcessStatus, UpdateOrderToreject } from '../../store/actions/checkout_actions';
import { deleteOrder, getOrders } from '../../store/actions/order_actions';
import s from '../../styles/carrito.module.css';

const stripePromise = loadStripe('pk_test_51HhisyJCzko8yllshTIdDvi4wXchIr9Qldywmk851YSOTubs7MbPWyS4YmE3n0IDR2VA1ha15pVFFsEKL4juFMnk00rPudOUZh');

/********************************************* Form Pay ***************************************************** */
function CardForm({ total, confirOrderProps, objenderProps, checkoutEndProps, user, order, sendEm, deleteOrderModal }) {
	const [loading, setLoading] = useState(false);
	const stripe = useStripe();
	const elements = useElements();
	let history = useHistory();
	// console.log(user)
	// console.log(sendEm)
	// let statuCheckout = checkoutEndProps && checkoutEndProps;
	// if(checkoutEndProps){
	//     setLoading(true)
	// }

	// if(loading){
	//     console.log('terminado')
	// }
	const handlerDeleteOrder = (idOrder) => {
		deleteOrderModal(idOrder);
		Cookie.remove('cartItems');
		window.location = '/';
		return;
	};

	const handlerSubmit = async (e) => {
		e.preventDefault();
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: elements.getElement(CardElement),
		});
		setLoading(true);
		if (!error) {
			// console.log(paymentMethod);
			confirOrderProps(paymentMethod.id, total, objenderProps.id);
			// let orderId = order.id;
			history.push('/paymethod/sucess');
			//sendEm(orderId, user)
			//sendStatusOrder(checkoutEndProps)
			// UpdateOrderToCreateFullorRejectProps(objenderProps.id, statuCheckout)
			//setLoading(false)
		} else {
			console.log(error);
		}
		setLoading(false);
	};

	return (
		<Form onSubmit={handlerSubmit}>
			<CardElement
				options={{
					style: {
						base: {
							fontSize: '16px',
							color: '#424770',
							'::placeholder': {
								color: '#aab7c4',
							},
						},
						invalid: {
							color: '#9e2146',
						},
					},
				}}
			/>
			<div className={s.button}>
				<Button type='submit' className={s.button1}>
					{loading ? 'Pagando' : 'Finalizar compra'}
				</Button>
				<Button className={s.button2} onClick={() => handlerDeleteOrder(objenderProps.id)}>
					Cancelar compra
				</Button>
			</div>
		</Form>
	);
}
/************************************************************************************************************ */

const PaymentMethod = ({ sendEmailP, UpdateOrderToProcessStatusP, checkoutP, UpdateOrderTorejectP, deleteOrderP, UpdateOrderToFullfilledP, confirmOrderP, orderCreatedP, getOrdersP, orderP, userLogin }) => {
	// const [form, setForm] = useState({
	// 	city: '',
	// 	adress: '',
	// 	phone: '',
	// 	postal: '',
	// });
	let orderConfirmFunction = confirmOrderP;
	// console.log('Orden Creada...');
	// console.log(orderCreatedP);
	// console.log('Ordenes...');
	// console.log(orderP);
	// console.log('estado de la Orden');
	// console.log(checkoutP);

	//let product = orderCreatedP ? orderCreated.products : []
	let checkoutEnd = checkoutP;
	let orderRender = orderP && orderP.filter((x) => x.id === orderCreatedP.id);
	cookie.set('orderCreated', JSON.stringify(orderRender[0]));
	let objender = orderRender[0] || cookie.getJSON('orderCreated');
	let products = objender && objender.products;
	// let orderP2 = orderP.length < 1 ? [] : orderP[0].products;
	// const  qty = location.search.split('=')[1]

	// console.log('Orden para renderizar');
	// console.log(objender);

	/********** USEEFECT *********** */
	useEffect(() => {
		if (checkoutEnd === false) {
			// console.log('Podes hacer la peticion aca');
			UpdateOrderTorejectP(orderCreatedP.id);
			getOrdersP();
			return;
		}
		getOrdersP();
	}, []);
	/********** USEEFECT *********** */
	// console.log('*****ORDER******');
	// console.log(userLogin);
	// let history = useHistory();

	return (
		<div>
			{/* < Navegacion linksU={enlacesUserSinAdmin} linksA={enlacesUserConAdmin} showSearchbar={false}/> */}
			<div className={`${s.cont_prin1} my-3`}>
				<div className={s.cont1}>
					<img className={`${s.logo}`} src={logo}></img>
					<ul>
						<li>
							<i>1</i>
							<span>Resumen de compra</span>
						</li>
						<li>
							<i>2</i>
							<span>Datos de envio</span>
						</li>
						<li>
							<i className={s.i}>3</i>
							<span className={s.span}>Forma de pago</span>
						</li>
					</ul>
				</div>
			</div>
			<div className={s.cont_form}>
				<Container className={s.contFormPay}>
					<div className={s.resCompra}>
						<div className={s.titleOrden}>
							<h1>Resumen de la compra</h1>
						</div>
						<div>
							{!products || products.length < 1 ? (
								<h3>Empty...</h3>
							) : (
								<div>
									<Table borderless size='sm'>
										<thead className={s.tableTitle}>
											<tr>
												<th>Producto</th>
												<th>Cantidad</th>
												<th>Precio</th>
											</tr>
										</thead>
										<tbody>
											{products.map((x) => {
												return (
													<tr className={s.tableDescrip}>
														<td>{x.name}</td>
														<td>{x.order_line.quantity}</td>
														<td>$ {x.price}</td>
													</tr>
												);
											})}
										</tbody>
									</Table>
									<div className={s.cont_total1}>
										<Table className={s.total} size='sm'>
											<tr>
												<td className={s.subinfo1}>SubToltal</td>
												<td className={s.subPrecio}>$ {objender && objender.subTotal}</td>
											</tr>
											<tr>
												<td className={s.subinfo1}>Iva</td>
												<td className={s.subPrecio}>$ {objender && objender.iva}</td>
											</tr>
											<tr>
												<td className={s.subinfo1}>Total</td>
												<td className={s.subPrecio}>$ {objender && objender.total}</td>
											</tr>
										</Table>
									</div>
								</div>
							)}
						</div>
					</div>
					<div className={s.contFormCardPay}>
						<div className={s.titleOrden}>
							<h1>Metodo de pago</h1>
						</div>
						<Elements className={s.pago} stripe={stripePromise}>
							<CardForm total={objender.total} confirOrderProps={orderConfirmFunction} objenderProps={objender} checkoutEndProps={checkoutEnd} UpdateOrderToSucess={UpdateOrderToFullfilledP} user={userLogin} order={orderCreatedP} sendEm={sendEmailP} deleteOrderModal={deleteOrderP} />
						</Elements>
					</div>
				</Container>
				{/* <div className={s.cont_button1}>
                        <Button className={s.buttonF} >Finalizar compra</Button>{"    "}
                        <Button className={s.buttonFC} >Cancelar compra</Button>

                    </div> */}
			</div>
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
		UpdateOrderToFullfilledP: (id) => dispatch(UpdateOrderToFullfilled(id)),
		UpdateOrderTorejectP: (id) => dispatch(UpdateOrderToreject(id)),
		sendEmailP: (idOrder, user) => dispatch(sendEmail(idOrder, user)),
		deleteOrderP: (id) => dispatch(deleteOrder(id)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethod);
