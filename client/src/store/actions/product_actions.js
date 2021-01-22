import axios from 'axios';

import { GET_PRODUCTS, ERROR_MESSAGE, MODIFY_PRODUCT, ADD_PRODUCT, DELETE_PRODUCT, ADD_CATEGORY_PRODUCT, REMOVE_CATEGORY_PRODUCT } from '../constants/constants';

const url = 'localhost:3001';

export function getProducts() {
	return (dispatch) => {
		axios
			.get(`http://${url}/products`)
			.then((res) => {
				if (res.status === 200) {
					dispatch({
						type: GET_PRODUCTS,
						products: res.data.data,
					});
				} else {
					dispatch({
						type: ERROR_MESSAGE,
						message: 'Error al mostrar productos',
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
}

export function addProduct(product, catIds) {
	return async (dispatch) => {
		await axios
			.post(`http://${url}/products/`, product)
			.then((res) => {
				if (res.status === 200) {
					let productId = res.data.data.id;
					dispatch({
						type: ADD_PRODUCT,
						products: res.data.data,
					});
					catIds.forEach((catId) => {
						axios.put(`http://${url}/products/${productId}/category/${catId}`).then((res) => {
							if (res.status === 200) {
								dispatch({
									type: ADD_CATEGORY_PRODUCT,
									product: res.data.data,
								});
							} else {
								dispatch({
									type: ERROR_MESSAGE,
									message: 'Error al añadir categoría(s) al producto',
								});
							}
						});
					});
				} else {
					dispatch({
						type: ERROR_MESSAGE,
						message: 'Error al crear el producto',
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
}

export function updProduct(dat) {
	return async (dispatch) => {
		await axios
			.put(`http://${url}/products/${dat.id}`, dat)
			.then((res) => {
				if (res.status === 200) {
					dispatch({
						type: MODIFY_PRODUCT,
						product: res.data.data,
					});
				} else {
					dispatch({
						type: ERROR_MESSAGE,
						message: 'Error al actualizar producto',
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
}

export function dltProduct(id) {
	return async (dispatch) => {
		await axios
			.delete(`http://${url}/products/${id}`)
			.then((res) => {
				if (res.status === 200) {
					dispatch({
						type: DELETE_PRODUCT,
						product: res.data.data,
					});
				} else {
					dispatch({
						type: ERROR_MESSAGE,
						message: 'Error al eliminar producto',
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
}

export function addProductCat(productId, catIds) {
	return async (dispatch) => {
		catIds.forEach((catId) => {
			axios
				.put(`http://${url}/products/${productId}/category/${catId}`)
				.then((res) => {
					if (res.status === 200) {
						dispatch({
							type: ADD_CATEGORY_PRODUCT,
							product: res.data.data,
						});
					} else {
						dispatch({
							type: ERROR_MESSAGE,
							message: 'Error al añadir categoría(s) al producto',
						});
					}
				})
				.catch((err) => {
					console.log(err);
				});
		});
	};
}

export function dltProductCat(productId, catId) {
	return async (dispatch) => {
		axios
			.delete(`http://${url}/products/${productId}/category/${catId}`)
			.then((res) => {
				if (res.status === 200) {
					dispatch({
						type: REMOVE_CATEGORY_PRODUCT,
						product: res.data.data,
					});
				} else {
					dispatch({
						type: ERROR_MESSAGE,
						message: 'Error al añadir categoría(s) al producto',
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
}
