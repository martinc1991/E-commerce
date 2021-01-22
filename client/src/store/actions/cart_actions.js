// Axios
import axios from 'axios';
import Cookie from 'js-cookie';
import { ADD_TO_CARD, DELETE_CART, ERROR_MESSAGE, REMOVE_FROM_CART, UPDATE_FROM_CART } from '../constants/constants';

const url = 'localhost:3001';
// const userData = {
// 	email: 'Astra_Guest@guest.com',
// 	password: 'guest',
// 	role: 'Guest',
// };

export function addToCart(id, qty, userID) {
	// console.log('entre a AddToCart');
	const product = { id, qty };
	let idUser = 1;
	// console.log(userID);
	// console.log(product);

	return async (dispatch, getState) => {
		axios
			.post(`http://${url}/users/${userID ? userID : idUser}/cart`, product)
			.then((res) => {
				// console.log('*****');
				// console.log(res.data);
				if (res.status === 200) {
					dispatch({
						type: ADD_TO_CARD,
						products: res.data.data,
					});
					const state = getState();
					// console.log(state.cart);
					// // Guardar Items en Cookies
					// const {cart:{cartItems}} = getState()
					Cookie.set('cartItems', JSON.stringify(state.cart));
				} else {
					dispatch({
						type: ERROR_MESSAGE,
						message: 'Error al obtener productos por Categoria',
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
}

export function removeFromCart(productId, userId) {
	// console.log('********id delete**********');
	// console.log(userId);
	return (dispatch, getState) => {
		axios
			.delete(`http://${url}/users/${userId}/cart/${productId}`)
			.then((res) => {
				// console.log('***********res of the route delete *****************');
				// console.log(res.data.data);
				dispatch({
					type: REMOVE_FROM_CART,
					payload: res.data.data,
				});
				const state = getState();
				// console.log(state.cart);
				// // Guardar Items en Cookies
				// const {cart:{cartItems}} = getState()
				Cookie.set('cartItems', JSON.stringify(state.cart));
			})
			.catch((er) => {
				console.log('ERRO EN EL CATHC DE DELETE');
			});
	};
}

export function updateFromCart(id, qty, userId) {
	return (dispatch, getState) => {
		// console.log(userId);
		// console.log(id);
		// console.log(qty);
		axios.put(`http://${url}/users/${userId}/cart`, { id, qty }).then((res) => {
			// console.log(res.data.data);
			dispatch({
				type: UPDATE_FROM_CART,
				payload: res.data.data,
			});
			const state = getState();
			// console.log(state.cart);
			// // Guardar Items en Cookies
			// const {cart:{cartItems}} = getState()
			Cookie.set('cartItems', JSON.stringify(state.cart));
		});
	};
}

export function deleteCart() {
	return (dispatch, getState) => {
		dispatch({
			type: DELETE_CART,
			payload: [],
		});
	};
}
