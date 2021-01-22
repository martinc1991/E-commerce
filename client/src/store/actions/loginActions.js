import axios from 'axios';
import { LOGIN, LOGIN_ERROR, LOGOUT } from '../constants/constants';
import Cookie from 'js-cookie';

const url = 'localhost:3001';

export const loginAction = (data) => {
	// console.log(data);
	return (dispatch, getState) => {
		axios
			.post(`http://${url}/users/singin`, data)
			.then((res) => {
				// console.log(res.data.data);
				if (res.data.data) {
					dispatch({
						type: LOGIN,
						payload: res.data.data,
					});
					const state = getState();
					Cookie.set('userLoad', JSON.stringify(state.userLogged));
				} else {
					dispatch({
						type: LOGIN_ERROR,
						payload: res.data.message,
					});
				}
			})
			.catch((err) => {
				console.log('error Catch Login Front', err);
			});
	};
};

export const logout = (data) => {
	return (dispatch, getState) => {
		// console.log('HPPPP');
		axios.get(`http://${url}/users/log/logout`).then((res) => {
			// console.log(res.data.message);
			dispatch({
				type: LOGOUT,
			});
		});
	};
};

export const loginActionttest = () => {
	return (dispatch, getState) => {
		console.log('Hola mundo');
	};
};
