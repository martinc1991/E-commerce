import React from 'react';
import './App.css';
import PrinciapalAdmin from './components/AdminForm/pageP';
import Product from './components/AdminForm/product';
import Category from './components/AdminForm/Categorys';
import Navegacion from './components/Navegacion/Navegacion';
import WellcomeAdmin from './components/AdminForm/WellcomAdmin'
import Slider from './components/Slider/Slider' 
import Footer from './components/Footer/Footer'
import ProductDet from './components/ProductDet/index'
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, Link } from 'react-router-dom';

var enlacesUser = [
	{ text: 'Catalogo', to: '/' },
	{ text: 'FAQs', to: '/' },
	{ text: 'Contacto', to: '/' },
	{ text: 'Ayuda', to: '/' },
	{ text: 'ADMIN', to: '/admin' },
];

var enlacesAdmin = [
	{ text: 'Inicio', to: '/admin' },
	{ text: 'Productos', to: '/admin/product' },
	{ text: 'Categorias', to: '/admin/category' },
];

function App() {
	return (
		<div>
			<Switch>
				<Route path='/' exact>
					<Navegacion links={enlacesUser} showSearchbar={true} />
					<Slider />
					<Footer></Footer>
				</Route>

				<Route path='/admin'>
					<Navegacion links={enlacesAdmin} showSearchbar={false} />
					<PrinciapalAdmin />
					<Route path='/admin' exact>
						<WellcomeAdmin />
					</Route>
					<Route path='/admin/product' component={Product} />
					<Route path='/admin/category' component={Category} />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
