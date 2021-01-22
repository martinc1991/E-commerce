import axios from 'axios';
import { ADD_REVIEW, DELETE_REVIEW, ERROR_MESSAGE, GET_USER_REVIEWS } from '../constants/constants';

const url = 'localhost:3001';

export function addReview(review, productId) {
	return async (dispatch) => {
		await axios
			.post(`http://${url}/product/${productId}/review`, review)
			.then((res) => {
				if (res.status === 200) {
					return dispatch({
						type: ADD_REVIEW,
						products: res.data.data,
					});
				} else {
					return dispatch({
						type: ERROR_MESSAGE,
						message: 'error al agregar review',
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
}
export function getUserReviews(productId, userId) {
	return (dispatch) => {
		axios
			.get(`http://${url}/product/${productId}/review/user/${userId}`)
			.then((res) => {
				// console.log('REVIEWS DE USUARIO EN EL ACTION');
				// console.log(res.data.data);
				if (res.status === 200) {
					return dispatch({
						type: GET_USER_REVIEWS,
						reviews: res.data.data,
					});
				} else {
					return dispatch({
						type: ERROR_MESSAGE,
						message: 'error al obtener reviews',
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
}

export function deleteUserReview(productId, reviewId) {
	return (dispatch) => {
		axios
			.delete(`http://${url}/product/${productId}/review/${reviewId}`)
			.then((res) => {
				// console.log('REVIEWS DE USUARIO EN EL ACTION');
				// console.log(res.data.data);
				if (res.status === 200) {
					return dispatch({
						type: DELETE_REVIEW,
						review: res.data.data,
					});
				} else {
					return dispatch({
						type: ERROR_MESSAGE,
						message: 'error al obtener reviews',
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
}

export function editUserReview(productId, editReview) {
	let reviewId = editReview.id;
	return (dispatch) => {
		axios
			.put(`http://${url}/product/${productId}/review/${reviewId}`, editReview)
			.then((res) => {
				// console.log('REVIEWS DE USUARIO EN EL ACTION');
				// console.log(res.data.data);
				if (res.status === 200) {
					return dispatch({
						type: DELETE_REVIEW,
						review: res.data.data,
					});
				} else {
					return dispatch({
						type: ERROR_MESSAGE,
						message: 'error al obtener reviews',
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
}
