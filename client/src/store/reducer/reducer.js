
import { 
  ADD_CATEGORY, GET_CATEGORIES, 
  DELETE_CATEGORY, MODIFY_CATEGORY, 
  ERROR_MESSAGE, ADD_PRODUCT, DELETE_PRODUCT, 
  ADD_CATEGORY_PRODUCT, REMOVE_CATEGORY_PRODUCT, 
  GET_PRODUCTS, MODIFY_PRODUCT, GET_PRODUCTS_BY_CATEGORY, 
  ADD_TO_CARD, REMOVE_FROM_CART, GET_ORDERS, UPDATE_FROM_CART, 
  CREATE_USER, GET_USERS, DELETE_USER, UPDATE_USER, DELETE_ORDER,
  DETAIL_USER, DELETE_CART, LOGIN, LOGIN_ERROR, LOGOUT, ADD_REVIEW, CREATE_ORDER, 
  UPDATE_ORDER_TO_CREATE, UPDATE_ORDER_TO_PROCESS, CHECKOUT_END, UPDATE_ORDER_TO_FULL, 
  UPDATE_ORDER_TO_REJECT, UPDATE_REVIEW, DELETE_REVIEW, GET_USER_REVIEWS, GET_ORDERS_STATUS} from '../constants/constans';

  import Cookie from 'js-cookie';

  const cartItems = Cookie.getJSON('cartItems') || []
  const userLoad = Cookie.getJSON('userLoad') || null



const inicialState = {
	categories: [],
	products: [],
	cart: cartItems,
	users: [],
	userSelected: [],
	orders: [],
	orderCreated : {},
	userReviews:[],


	userLogged: userLoad,
	logged: false,
	checkout: "",


	messageError: ''

};

const ReducerCategory = (state = inicialState, action) => {
	console.log(action);
	switch (action.type) {
		/****************************** CATEGORIES ********************************/
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

		/****************************** PRODUCTS **********************************/
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

		case DELETE_USER:
			console.log(action.id.data.id);
			let newUsers = state.users.filter((user) => user.id !== action.id.data.id);
			return { ...state, users: newUsers };

		case UPDATE_USER:
			console.log(action.payload.data);
			const { id, role } = action.payload.data;
			console.log(id, role);
			var userToUpdatePosition = state.users.indexOf(state.users.filter((user) => user.id === id)[0]);
			// console.log(userToUpdatePosition);
			var userToUpdate = state.users[userToUpdatePosition];
			// console.log(userToUpdate);
			var userUpdated = { ...userToUpdate, role: role };
			var oldUsers = state.users;
			// console.log(oldUsers);
			oldUsers[userToUpdatePosition] = userUpdated;
			return { ...state, users: oldUsers };

		case DETAIL_USER:
			return { ...state, userSelected: action.users };

		case ERROR_MESSAGE:
			console.log('error en algun lado: el reducer');
			return inicialState;

		/****************************** CATALOGO **********************************/
		case GET_PRODUCTS_BY_CATEGORY:
			return { ...state, products: action.products };

		/****************************** CART **************************************/
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
		case DELETE_CART:
			return {...state, cart: action.payload}

		/****************************** ORDERS ************************************/
		case GET_ORDERS:
			return {...state, orders: action.orders };
		case GET_ORDERS_STATUS:
			console.log('EL STATUS EN EL REDUCER')
			console.log(action.orders)
			return {...state, orders: action.orders };
		case DELETE_ORDER:
			let newOrders = state.orders.filter((order) => order.id !== action.order.id);
			return {...state, orders: newOrders}
		case CREATE_ORDER:
			 return {...state, orderCreated: action.payload }
		case UPDATE_ORDER_TO_CREATE:
			 return {...state, orderCreated: action.payload}
		case UPDATE_ORDER_TO_PROCESS:
			return {...state, orderCreated: action.payload}
		case CHECKOUT_END:
			//const {message, pay} = action
			return {...state, checkout:action.pay}
		case UPDATE_ORDER_TO_REJECT:
			return {...state, orderCreated: action.payload}
		case UPDATE_ORDER_TO_FULL:
			return {...state, orderCreated: action.payload}
		
		/********************************* LOGIN ********************************* */
		case LOGIN:
			return {...state, userLogged:action.payload, messageError: '', logged:true}
		case LOGIN_ERROR:
			return {...state, userLogged: null, messageError: action.payload, logged:false}
		case LOGOUT:
			return {...state, userLogged: null, messageError: '', cart:[], logged:false}
		
		default: return inicialState;

		/****************************** REVIEW ********************************/
		case ADD_REVIEW:
			return {...state, products:action.products}
		case GET_USER_REVIEWS:
			return {...state, userReviews: action.reviews}
		case UPDATE_REVIEW:
			console.log('REVIEWS DE USUARIO EN EL REDUCER DESPUES DE EDITAR UNA')
			console.log(action.review);
			let editedReview = action.review;
			let newReviewsEdit = state.userReviews;
			let editReviewIndex = newReviewsEdit.indexOf(editedReview);
			newReviewsEdit[editReviewIndex] = action.review;
			return {...state, userReviews: newReviewsEdit }
		case DELETE_REVIEW:
			let deletedReview = action.review;
			let newReviews = state.userReviews.filter((review) => review.id !== deletedReview.id);
			return {...state, userReviews: newReviews}

	}
};

export default ReducerCategory;
