import axios from 'axios';
import { CREATE_USER, ERROR_MESSAGE, GET_USERS, DELETE_USER, UPDATE_USER, DETAIL_USER } from '../constants/constans';

const url = 'localhost:3001';

// CREAR USUARIO
export function createUser(userData) {
	console.log('algo me llego');
	console.log(userData);
	return (dispatch) => {
		axios
			.post(`http://${url}/users`, userData)
			.then((res) => {
				console.log(res.data);
				console.log('peticion enviada');
				if (res.status === 201) {
					console.log('tire estado 201');
					console.log(res.data);
					dispatch({
						type: CREATE_USER,
						users: res.data || {},
						createUserSuccess: true,
					});
				} else {
					dispatch({
						type: ERROR_MESSAGE,
						users: 'Error in the Request',
					});
				}
			})
			.catch((err) => {
				console.log('Error');
				console.log(err);
			});
	};
}

// GET USUARIOS
export function getUsers() {
	return (dispatch) => {
		axios
			.get(`http://${url}/users`)
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					dispatch({
						type: GET_USERS,
						users: res.data.data,
					});
				} else {
					dispatch({
						type: ERROR_MESSAGE,
						categories: 'Error in the Request',
					});
				}
			})
			.catch((err) => {
				console.log('Catch Error');
				console.log(err);
			});
	};
}

// ELIMINAR USUARIOS
export function deleteUser(userID) {
	console.log('algo me llego para hacer delete');
	console.log(userID);
	return (dispatch) => {
		axios
			.delete(`http://${url}/users`, {
				params: { id: userID },
			})
			.then((res) => {
				console.log(res.data);
				console.log('delete enviado');
				if (res.status === 200) {
					console.log('tire estado 200');
					console.log(res.data);
					dispatch({
						type: DELETE_USER,
						id: res.data || {},
					});
				} else {
					console.log('delete error en la action');
					dispatch({
						type: ERROR_MESSAGE,
						id: 'Error in the Request',
					});
				}
			})
			.catch((err) => {
				console.log('Error');
				console.log(err);
			});
	};
}

// MODIFICAR USUARIOS
export function updateUser(data) {
	console.log('el update llego a ACTIONS');
	// const { id, password, role } = data;
	console.log(data);
	return (dispatch) => {
		axios
			.put(`http://${url}/users`, data)
			.then((res) => {
				console.log(res.data);
				console.log('peticion PUT enviada');
				if (res.status === 200) {
					console.log('tire estado 200');
					console.log(res.data);
					dispatch({
						type: UPDATE_USER,
						payload: res.data || {},
					});
				} else {
					console.log('UPDATE error en la action');
					dispatch({
						type: ERROR_MESSAGE,
						id: 'Error in the Request',
					});
				}
			})
			.catch((err) => {
				console.log('Catch error en actions');
				console.log(err);
			});
	};
}

export function getUserDetail(id) {
	return (dispatch) => {
		axios
			.get(`http://${url}/users/${id}`)
			.then((res) => {
				console.log('***** Detail USer **********');
				console.log(res);
				dispatch({
					type: DETAIL_USER,
					users: res.data.user,
				});
			})
			.catch((er) => {
				console.log(er);
			});
	};
}
