import axios from 'axios';
import { CREATE_USER, ERROR_MESSAGE, GET_USERS } from '../constants/constans';

const url = 'localhost:3001';

export function createUser(userData) {
	console.log('algo me llego');
	console.log(userData);
	return (dispatch) => {
		axios
			.post(`http://${url}/user`, userData)
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

export function getUsers() {
	return (dispatch) => {
		axios
			.get(`http://${url}/user`)
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
