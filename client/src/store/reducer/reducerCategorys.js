import { ADD_CATEGORY, GET_CATEGORIES, DELETE_CATEGORY, MODIFY_CATEGORY, ERROR_MESSAGE, ADD_PRODUCT, DELETE_PRODUCT, ADD_CATEGORY_PRODUCT, REMOVE_CATEGORY_PRODUCT, GET_PRODUCTS, MODIFY_PRODUCT, GET_PRODUCTS_BY_CATEGORY, ADD_TO_CARD, REMOVE_FROM_CART, CREATE_USER, GET_USERS,UPDATE_FROM_CART } from '../constants/constans';

const inicialState = {
	categories: [],
	products: [],
	cart: [],
	users: [],
};

const ReducerCategory = (state = inicialState, action) => {
	console.log(action);
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
			return { ...state, products: [...state.products, action.products] };

		case MODIFY_PRODUCT:
			console.log(action);
			const { sku, name, description, price, stock, image, dimentions } = action.product;
			let productToUpdate = state.products.filter((product) => product.id === parseInt(action.product.id))[0];
			let index = state.products.indexOf(productToUpdate);
			let products = [...state.products];
			products[index].name = name;
			products[index].description = description;
			products[index].price = price;
			products[index].stock = stock;
			products[index].image = image;
			products[index].dimentions = dimentions;
			return { ...state, products };

		case DELETE_PRODUCT:
			let newProducts = state.products.filter((product) => product.id !== action.product.id);
			return { ...state, products: newProducts };

		case ADD_CATEGORY_PRODUCT:
			let filteredProduct = state.products.filter((product) => product.id === parseInt(action.product.id))[0];
			let productIndex = state.products.indexOf(filteredProduct);
			let newProduct = [...state.products];
			newProduct[productIndex] = action.product;
			return { ...state, products: newProduct };

		case REMOVE_CATEGORY_PRODUCT:
			let catRemovedProduct = state.products.filter((product) => product.id === parseInt(action.product.id))[0];
			let removedCatIndex = state.products.indexOf(catRemovedProduct);
			let newProductState = [...state.products];
			newProductState[removedCatIndex] = action.product;
			return { ...state, products: newProductState };

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

		/****************************** CART *********************************** */
		case ADD_TO_CARD:
			const item = action.products;
			const product = state.cart.find((x) => x.id === item.id);
			if (product) {
				return {
					...state,
					cart: state.cart.map((x) => (x.id === product.id ? item : x)),
				};
			}
			return { ...state, cart: [...state.cart, item] };
		case REMOVE_FROM_CART:
			// let productsNew = state.cart.products.filter(x => x.id !== productsP.id)
			// let order = state.cart.filter(x => x.id === action.payload.id)
			// order.products = productsNew
			return { ...state, cart: [action.payload] };
		case UPDATE_FROM_CART:
			return { ...state, cart: [action.payload] };
		default:
			return inicialState;
	}
};

export default ReducerCategory;
