import axios from 'axios';
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Category from './components/AdminForm/Categorys';
import UserDetail from './components/AdminForm/DetailUser.jsx';
import Orders from './components/AdminForm/Orders';
// import UserList from './components/UserList/UserList.js';
import Product from './components/AdminForm/product';
import UsersData from './components/AdminForm/UsersData';
import WellcomeAdmin from './components/AdminForm/WellcomAdmin';
import CartShop from './components/Cart/card'; // Redux
import Catalogo from './components/Catalogo/index';
import CheckoutSucess from './components/ckeckout/checkoutSucess';
import DataUserShopping from './components/ckeckout/dataUser';
import PaymentMethod from './components/ckeckout/paymentMethod';
import Contacto from './components/Contacto/Contacto.jsx';
import Faqs from './components/FAQs/Faqs.jsx';
import Footer from './components/Footer/Footer';
import FormUsers from './components/FormUsers/FormUsers.jsx';
import Login from './components/Login/Login';
import Navegacion from './components/Navegacion/Navegacion';
import ProductDet from './components/ProductDet/index';
import ProfileUser from './components/ProfileUser/ProfileUser';
import PrivateAdmin from './components/Routes/PrivateAdmin';
import PrivateRoute from './components/Routes/PrivateRoute';
import Slider from './components/Slider/Slider';
import Whatsapp from './components/Whatsapp/ws.js';
import { enlacesUserConAdmin, enlacesUserSinAdmin } from './constants/constants';
import s from './styles/app.module.css';

const url = 'development.c4vdw28snupv.sa-east-1.rds.amazonaws.com';

function App() {
	const [products, setProduct] = useState([]);

	const onSearch = (search) => {
		//console.log('NOmbre: ' + search)
		axios.get(`http://${url}/products/search?query=${search}`).then((res) => {
			setProduct([]);
			let { data } = res.data;
			// console.log(data);
			setProduct(data);
			return;
		});
	};

	return (
		<div className={`${s.all} d-flex flex-column`}>
			{' '}
			{/* Estilos para que el footer quede fijo al final */}
			<Switch>
				{/* HOME */}
				<Route path='/' exact>
					<Navegacion linksU={enlacesUserSinAdmin} linksA={enlacesUserConAdmin} showSearchbar={true} onSearch={onSearch} />
					<Slider />
					<Whatsapp></Whatsapp>
					<Footer></Footer>
				</Route>
				{/* HOME */}

				{/* FAQS */}
				<Route path='/faqs' exact>
					<Navegacion linksU={enlacesUserSinAdmin} linksA={enlacesUserConAdmin} showSearchbar={true} onSearch={onSearch} />
					<Faqs></Faqs>
					<Whatsapp></Whatsapp>
					<Footer></Footer>
				</Route>

				{/* FAQS */}

				{/*Contacto*/}
				<Route path='/contacto' exact>
					<Navegacion linksU={enlacesUserSinAdmin} linksA={enlacesUserConAdmin} showSearchbar={true} onSearch={onSearch} />
					<Contacto></Contacto>
					<Footer></Footer>
				</Route>
				{/*Contacto*/}

				{/* ADMIN */}
				<Route path='/admin'>
					<PrivateAdmin path='/admin' exact component={WellcomeAdmin} />
					<PrivateAdmin path='/admin/product' component={Product} />
					<PrivateAdmin path='/admin/category' component={Category} />
					<PrivateAdmin path='/admin/users' component={UsersData} />
					<PrivateAdmin path='/admin/orders' component={Orders} />
				</Route>
				{/* ADMIN */}

				{/* PRODUCTS */}
				<Route path='/products/catalogo'>
					<Navegacion linksU={enlacesUserSinAdmin} linksA={enlacesUserConAdmin} showSearchbar={true} onSearch={onSearch} />
					<Catalogo products={products} onSearch={onSearch} />
					<Whatsapp></Whatsapp>
					{/* <UserList></UserList> */}
					<Footer></Footer>
				</Route>

				<Route path='/products/product/:id'>
					<Navegacion linksU={enlacesUserSinAdmin} linksA={enlacesUserConAdmin} showSearchbar={true} />
					<Whatsapp></Whatsapp>
					<ProductDet />
				</Route>
				{/* PRODUCTS */}

				{/* USERS */}
				<Route path='/users' exact>
					<Navegacion linksU={enlacesUserSinAdmin} linksA={enlacesUserConAdmin} showSearchbar={true} onSearch={onSearch} />
					<FormUsers></FormUsers>
					<Whatsapp></Whatsapp>
					<Footer></Footer>
				</Route>

				<Route path='/users/cart'>
					<Navegacion linksU={enlacesUserSinAdmin} linksA={enlacesUserConAdmin} showSearchbar={true} onSearch={onSearch} />
					<CartShop></CartShop>
					<Whatsapp></Whatsapp>
					<Footer></Footer>
				</Route>

				<Route path='/users/:id' exact component={UserDetail} />
				{/* USERS */}

				{/* PROFILE */}
				<PrivateRoute path='/profile' component={ProfileUser} />
				<PrivateRoute path='/shopping' component={DataUserShopping} />
				<PrivateRoute path='/paymethod' exact component={PaymentMethod} />
				<PrivateRoute path='/paymethod/sucess' component={CheckoutSucess} />
				{/* PROFILE */}

				{/* LOGIN */}
				<Route path='/login' exact>
					<Navegacion linksU={enlacesUserSinAdmin} linksA={enlacesUserConAdmin} showSearchbar={true} onSearch={onSearch} />
					<Login></Login>
					<Whatsapp></Whatsapp>
					<Footer></Footer>
				</Route>
				{/* LOGIN */}
			</Switch>
		</div>
	);
}

export default App;
