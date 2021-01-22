import axios from 'axios';
import { GET_ORDERS, GET_ORDERS_STATUS, DELETE_ORDER, ERROR_MESSAGE } from '../constants/constants';

const url = 'localhost:3001';

export function getOrders() {
	return (dispatch) => {
		axios
			.get(`http://${url}/orders`)
			.then((res) => {
				if (res.status === 200) {
					dispatch({
						type: GET_ORDERS,
						orders: res.data.data || [],
					});
				} else {
					dispatch({
						type: ERROR_MESSAGE,
						message: 'Error in the Request',
					});
				}
			})
			.catch((err) => {
				console.log('Error');
			});
	};
}

export function filterOrders(status) {
	return (dispatch) => {
		console.log('STATUS EN EL ACTION ES ', status);
		axios
			.get(`http://${url}/orders/filter?status=${status}`)
			.then((res) => {
				if (res.status === 200) {
					dispatch({
						type: GET_ORDERS_STATUS,
						orders: res.data.data || [],
					});
				} else {
					dispatch({
						type: ERROR_MESSAGE,
						message: 'Error in the Request',
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
}

export function deleteOrder(id) {
	return (dispatch) => {
		axios
			.delete(`http://${url}/orders/shopping/${id}`)
			.then((res) => {
				if (res.status === 200) {
					dispatch({
						type: DELETE_ORDER,
						order: res.data.data,
					});
				} else {
					dispatch({
						type: ERROR_MESSAGE,
						message: 'Error al eliminar la categoria',
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
}
