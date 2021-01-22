import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookie from 'js-cookie';
import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import CardVacio from '../../multimedia/carrtvacio.png';
import logo from '../../multimedia/logo.png';
import { addToCart, deleteCart, removeFromCart, updateFromCart } from '../../store/actions/cart_actions';
import { CreateOrder, UpdateOrderToCreateStatus } from '../../store/actions/checkout_actions';
import { deleteOrder, getOrders } from '../../store/actions/order_actions';
import s from '../../styles/carrito.module.css';

const CartShop = ({ addToCartP, cartP, removeFromCartP, updateFromCartP, deleteOrderP, UpdateOrderToCreateStatusP, deleteCartP, orderCreatedP, getOrdersP, orderP, userLogin, CreateOrderP }) => {
	// const [quantity, setQuantity] = useState(0);
	// const {idUser} = match.params
	// console.log(Cookie.getJSON('cartItems'));
	// console.log(orderCreatedP);
	// console.log(orderP);
	let cartCookie = Cookie.getJSON('cartItems');
	let cartP2 = cartP.length < 1 ? [] : cartP[0].products;
	// let orderP2 = orderCreatedP ? orderCreatedP.products : [];
	// const  qty = location.search.split('=')[1]
	var arrayOrderBd = orderP.filter((x) => {
		return x.id === orderCreatedP.id;
	});
	// console.log(arrayOrderBd);
	let obj = arrayOrderBd[0] && arrayOrderBd[0].products;
	// console.log(obj);

	/********** USEEFECT *********** */
	useEffect(() => {
		if (userLogin && cartCookie !== undefined) {
			getOrdersP();
			CreateOrderP(cartCookie[0], userLogin.id);
			cartP2 = obj;
			return;
		}
		getOrdersP();
	}, []);
	/********** USEEFECT *********** */
	// console.log('*****ORDER******');
	// console.log(userLogin);
	let history = useHistory();

	// const createOrder = (cart, id) => {
	// 	if (!userLogin) {
	// 		history.push('/login');
	// 	} else {
	// 		//alert('Estas Logueado' + userLogin.name)
	// 		CreateOrderP(cart, id);
	// 		//deleteOrderCartP(cartP[0].id, cartP[0].status)
	// 		history.push('/shopping');
	// 		// deleteCartP()
	// 		//window.location = '/users/cart'
	// 		return;
	// 	}
	// };
	const UpdateOrderToCreate = (id, cart) => {
		//
		let objOrder = {
			subTotal: subTotal(cart),
			iva: vIva(cart),
			total: vTotal(cart),
		};
		if (!userLogin) {
			return history.push('/login');
		} else {
			// console.log(objOrder);
			history.push('/shopping');
			UpdateOrderToCreateStatusP(id, objOrder);
			return;
		}
	};
	const subTotal = (cart) => {
		return cart.reduce((a, c) => a + c.order_line.quantity * c.price, 0);
	};
	const vIva = (cart) => {
		return Math.trunc(cart.reduce((a, c) => a + c.order_line.quantity * c.price, 0) * 0.19);
	};
	const vTotal = (cart) => {
		return Math.trunc(cart.reduce((a, c) => a + c.order_line.quantity * c.price, 0) * 0.19) + cart.reduce((a, c) => a + c.order_line.quantity * c.price, 0);
	};

	const handlerDeleteOrder = (idOrder) => {
		deleteOrderP(idOrder);
		Cookie.remove('cartItems');
		window.location = '/';
		return;
	};

	return (
		<div>
			<div>
				{/* < Navegacion linksU={enlacesUserSinAdmin} linksA={enlacesUserConAdmin} showSearchbar={false}/> */}
				<div className={`${s.cont_prin} my-3`}>
					<div className={s.cont1}>
						<img className={`${s.logo}`} src={logo}></img>
						<ul>
							<li>
								<i className={s.i}>1</i>
								<span className={s.span}>Resumen de compra</span>
							</li>
							<li>
								<i>2</i>
								<span>Datos de envio</span>
							</li>
							<li>
								<i>3</i>
								<span>Forma de pago</span>
							</li>
						</ul>
					</div>
					<h1>Mi carrito</h1>
					{cartP2.length < 1 ? (
						<div className={s.cardVacio}>
							<img src={CardVacio}></img>
							<h1>!TU CARRITO DE COMPRAS AHORA ESTA VACIO¡</h1>
							<h6>Busca y añade los articulos que mas te gusten al carrito</h6>
							<Link className={s.link} to='/'>
								Sigue comprando
							</Link>
						</div>
					) : (
						<div className={s.cont2}>
							<div className={s.cont_table}>
								<Table size='sm'>
									<thead className={s.tableTitle}>
										<tr>
											<th>Producto</th>
											<th className={s.envio}>Envio</th>
											<th>Precio</th>
											<th className={s.cantidadTitle}>Cantidad</th>
											<th>Total</th>
											<th className={s.nada}></th>
										</tr>
									</thead>
									<tbody>
										{cartP2.map((product, index) => {
											return (
												<tr className={s.tableDescrip}>
													<Link to={'/products/product/' + product.id}>
														<td className={s.product}>
															<div className={s.cont_img}>
																<img src={product.image}></img>
															</div>
															<a>{product.name}</a>
														</td>
													</Link>
													<td className={s.pronto}>Se enviara Pronto</td>
													<td className={s.PreCant}>$ {product.price}</td>
													{/* <div className={s.cont_cant}> */}
													<td className={s.cantidad}>
														{/* <div className={s.button1} onClick={() => increment(product)}>-</div>  */}
														{/* <input className={s.input} type="number" name="name" value={product.qty}  onChange={(e)=> addToCartP(product.id, e.target.value)}/> */}
														{/* {<div className={s.button2} onClick={() => decrement(product)}>+</div> } */}
														<select name='Cantidad' id='Cantidad' value={product.order_line.quantity} onChange={(e) => updateFromCartP(product.id, e.target.value, userLogin ? userLogin.id : 1)}>
															{[...Array(product.stock).keys()].map((x) => {
																return <option value={x + 1}>{x + 1}</option>;
															})}
														</select>
													</td>
													{/* </div> */}
													<td className={s.PreCant}>$ {product.order_line.quantity * product.price}</td>
													<td className={s.icon}>
														<FontAwesomeIcon icon={faTrashAlt} size={'1x'} className={s.iconDelete} onClick={() => removeFromCartP(product.id, userLogin ? userLogin.id : 1)} />
													</td>
												</tr>
											);
										})}
									</tbody>
								</Table>
							</div>
							<div className={s.cont_total}>
								<div className={s.total}>
									<Table striped borderless size='sm'>
										<tbody className={s.tabletotal}>
											<tr>
												<td className={s.subinfo1}>Subtotal</td>
												<td className={s.subPrecio}>$ {subTotal(cartP2)}</td>
											</tr>
											<tr>
												<td className={s.subinfo1}>Iva</td>
												<td className={s.subPrecio}>$ {vIva(cartP2)}</td>
											</tr>
											<tr>
												<td className={s.subinfo2}>Total</td>
												<td className={s.subPrecio}>$ {vTotal(cartP2)}</td>
											</tr>
										</tbody>
									</Table>
								</div>
							</div>
							<div className={s.cont_button1}>
								<Button className={s.buttonF} onClick={() => UpdateOrderToCreate(orderCreatedP.id, cartP2)}>
									Finalizar compra
								</Button>
								{'    '}
								<Button className={s.buttonFC} onClick={() => handlerDeleteOrder(orderCreatedP.id)}>
									Cancelar compra
								</Button>
							</div>
						</div>
					)}
				</div>
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
	};
}

function mapDispatchToProps(dispatch) {
	return {
		addToCartP: (id, qty) => dispatch(addToCart(id, qty)),
		removeFromCartP: (id, idUser) => dispatch(removeFromCart(id, idUser)),
		updateFromCartP: (id, qty, idUser) => dispatch(updateFromCart(id, qty, idUser)),
		deleteCartP: () => dispatch(deleteCart()),
		getOrdersP: () => dispatch(getOrders()),
		CreateOrderP: (cartP2, userId) => dispatch(CreateOrder(cartP2, userId)),
		UpdateOrderToCreateStatusP: (id, objCart) => dispatch(UpdateOrderToCreateStatus(id, objCart)),
		deleteOrderP: (id) => dispatch(deleteOrder(id)),
		//deleteOrderCartP : (id, status) => dispatch(deleteOrderCart(id, status))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CartShop);
