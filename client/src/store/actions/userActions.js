import axios from 'axios';
import { CREATE_USER, ERROR_MESSAGE } from '../constants/constans';

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
					dispatch({
						type: CREATE_USER,
						users: res.data[0] || [],
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
			});
	};
}

// export function getCategories() {
// 	return (dispatch) => {
// 		axios
// 			.get(`http://${url}/products/category`)
// 			.then((res) => {
// 				if (res.status === 200) {
// 					dispatch({
// 						type: GET_CATEGORIES,
// 						categories: res.data.result || [],
// 					});
// 				} else {
// 					dispatch({
// 						type: ERROR_MESSAGE,
// 						categories: 'Error in the Request',
// 					});
// 				}
// 			})
// 			.catch((err) => {
// 				console.log('Error');
// 			});
// 	};
// }
