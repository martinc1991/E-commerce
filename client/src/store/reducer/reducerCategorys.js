import { ADD_CATEGORY, GET_CATEGORIES, DELETE_CATEGORY, MODIFY_CATEGORY, ERROR_MESSAGE, ADD_PRODUCT, DELETE_PRODUCTS, ADD_CATEGORY_PRODUCT, REMOVE_CATEGORY_PRODUC, GET_PRODUCTS, GET_PRODUCTS_BY_CATEGORY, CREATE_USER, GET_USERS } from '../constants/constans';

const inicialState = {
	categories: [],
	products: [],
	users: [],
	createUserSuccess: false,
};

const ReducerCategory = (state = inicialState, action) => {
	// console.log(action);
	switch (action.type) {
		case GET_CATEGORIES:
			return { ...state, categories: action.categories };
		case ADD_CATEGORY:
			return { ...state, categories: state.categories.concat(action.category) };
		case MODIFY_CATEGORY:
			console.log(state.categories);
			let cat = state.categories.filter((cat) => cat.id == parseInt(action.category.id))[0];
			if (cat === undefined) return { ...state };
			let ind = state.categories.indexOf(cat);

			let categories = [...state.categories];
			console.log(categories[ind]);
			categories[ind].name = action.category.name;
			categories[ind].description = action.category.description;
			console.log(categories);
			return { ...state, categories: categories };
		case DELETE_CATEGORY:
			return {
				...state,
				categories: state.categories.filter((c) => {
					return c.id !== action.category.id;
				}),
			};

		/****************************** PRODUCTS *********************************** */
		case GET_PRODUCTS:
			return { ...state, products: action.products };
		case ADD_PRODUCT:
		//return {...state, products: state.products.concat(action.products)}

		/****************************** USERS *********************************** */
		case CREATE_USER:
			console.log('accion del reducer');
			console.log(action);
			return { ...state, users: state.users.concat(action.users.data), createUserSuccess: action.createUserSuccess };

		case GET_USERS:
			console.log('reducer GET_USERS');
			return { ...state, users: action.users };

		case ERROR_MESSAGE:
			console.log('error en algun lado: el reducer');
			return inicialState;

		/****************************** CATALOGO *********************************** */
		case GET_PRODUCTS_BY_CATEGORY:
			return { ...state, products: action.products };

		default:
			return inicialState;
			break;
	}
};

export default ReducerCategory;
