import axios from 'axios';
const url = 'localhost:3001';

const populateProductsFunction = function () {
	axios
		.post(`http://${url}/populate/products`, {})
		.then((res) => {
			console.log('Products:', res.status);
		})
		.catch((err) => {
			console.log('Error:', err.message);
		});
};

const populateUsersFunction = function () {
	axios
		.post(`http://${url}/populate/users`, {})
		.then((res) => {
			console.log('Users:', res.status);
		})
		.catch((err) => {
			console.log('Error:', err.message);
		});
};

const populateCategoriesFunction = function () {
	axios
		.post(`http://${url}/populate/categories`, {})
		.then((res) => {
			console.log('Categories:', res.status);
		})
		.catch((err) => {
			console.log('Error:', err.message);
		});
};

populateProductsFunction();
populateUsersFunction();
populateCategoriesFunction();
