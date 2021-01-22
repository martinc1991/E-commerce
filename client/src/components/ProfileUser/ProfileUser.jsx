import React, { useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { enlacesUserConAdmin, enlacesUserSinAdmin } from '../../constants/constants';
import { getOrders } from '../../store/actions/order_actions';
import s from '../../styles/profile.module.css';
import Navegacion from '../Navegacion/Navegacion';

const ProfileUser = ({ userLoggedP, logoutP, loginActionP, orders, getOrdersP }) => {
	// console.log('ACA ESTAN LAS ORDENES Y LOS PRODUCTOS', orders);
	useEffect(() => {
		getOrdersP();
	}, []);

	const ordersFiltered = orders.filter((x) => x.user.id === userLoggedP.id);

	// console.log(ordersFiltered);

	return (
		<div className={s.all}>
			<Navegacion linksU={enlacesUserSinAdmin} linksA={enlacesUserConAdmin} showSearchbar={true} />
			<div className={s.background}></div>
			<div className={s.contPrincipal}>
				<Card className={`${s.cardStyle1} ${s.prueba}`}>
					{/* <Image className={s.size} src={placeholder} roundedCircle/> */}
					<Card.Body className={s.cardItemUser}>{userLoggedP.name}</Card.Body>
					<Card.Body className={s.email}>{userLoggedP.email}</Card.Body>
				</Card>
				<Card className={`${s.cardStyle} ${s.compras} ${s.cardStyleOrd}`}>
					<Card.Header className={`${s.cardStyleOrd} text-center`}>
						<h2 className={s.otro}>Historial de compras</h2>
					</Card.Header>
					{ordersFiltered &&
						ordersFiltered.map((x) => {
							if (x.status === 'fullfilled') {
								return (
									<div>
										{/* <Card.Body className={`${s.cardItem} w-100`}> */}
										<Row className={`${s.cardItem}`}>
											<Col xs={12} lg={3} className={`text-center text-lg-left`}>
												<h2>{x.products[0].name}</h2>
												{/* <p>Celular Lg k10 texto largooooo</p> */}
												<img src={x.products[0].image} alt='imagen-producto' className={s.image} />
											</Col>

											<Col xs={12} lg={3} className={`text-center text-lg-left ${s.columna}`}>
												<p>Dirección: {x.adress}</p>
												<p>Ciudad: {x.city}</p>
												<p>Método de pago: {x.paymentMethod}</p>
											</Col>

											<Col xs={12} lg={3} className={`text-center text-lg-left ${s.columna}`}>
												<p>Teléfono: {x.phone}</p>
												<p>Código postal: CP{x.postal}</p>
												<p>Estatus: {x.status}</p>
											</Col>

											<Col xs={12} lg={3} className={`text-center text-lg-left ${s.columna}`}>
												<p>Precio: ${x.products[0].order_line.price}</p>
												<p>Cantidad: {x.products[0].order_line.quantity} U</p>
												<p>Subtotal: ${x.subTotal}</p>
												<p className={s.total}>Total: ${x.total}</p>
											</Col>
										</Row>
										{/* </Card.Body> */}
									</div>
								);
							} else {
								return <div>No hay ninguna compra en el historial</div>;
							}
						})}
				</Card>
			</div>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		userLoggedP: state.userLogged,
		messageErrorP: state.messageError,
		orders: state.orders,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getOrdersP: () => dispatch(getOrders()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUser);
