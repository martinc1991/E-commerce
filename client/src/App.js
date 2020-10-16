import React, { useState } from 'react';
import './App.css';
import PrinciapalAdmin from './components/AdminForm/pageP';
import Product from './components/AdminForm/product';
import Category from './components/AdminForm/Categorys';
import Navegacion from './components/Navegacion/Navegacion';
import WellcomeAdmin from './components/AdminForm/WellcomAdmin'
import Slider from './components/Slider/Slider' 
import Footer from './components/Footer/Footer'
import ProductDet from './components/ProductDet/index'
import ProductCard from './components/ProductCard/index'
import Catalogo from './components/Catalogo/index'
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, Link } from 'react-router-dom';
import axios from 'axios'
import CartShop from './components/Cart/card';



const url = 'localhost:3001'

var enlacesUser = [
	{ text: 'Catalogo', to: '/products/catalogo' },
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
	const [products, setProduct] = useState([])

	const onSearch = (search)=> {
		//console.log('NOmbre: ' + search)
		axios.get(`http://${url}/products/search?query=${search}`)
			 .then(res => {
				 let {data} = res.data
				 console.log(data)
				 setProduct(data)
				 return
				 
			 })
	}

	

	return (
		<div>
			{/* <ProductCard/> */}
			<Switch>
				<Route path='/' exact>
					< Navegacion links={enlacesUser} showSearchbar={true} onSearch={onSearch} />
					<Slider />
					<Footer></Footer>
				</Route>        
				{/* <Route path='/admin' exact > */}
				<Route path='/admin' >
					<Navegacion links={enlacesAdmin} showSearchbar={false} />
					<PrinciapalAdmin />
					<Route path='/admin' exact>
						<WellcomeAdmin />
					</Route>
					<Route path='/admin/product' component={Product} />
					<Route path='/admin/category' component={Category} />
				</Route>
				<Route path='/admin/product' component={Product} />
				<Route path='/admin/category' component={Category} />
        		{/* <Route path='/product/:id' component={ProductDet} /> */}
				<Route path='/products/product/:id'>
					<Navegacion links={enlacesUser} showSearchbar={true} />
					<ProductDet />
				</Route>
				
				<Route  
					path='/products/catalogo' 
					render={()=> 
						<Catalogo 
							products ={products}
							onSearch={onSearch}
						/>
					}
				>	
				 </Route>
				 <Route  path='/users/:idUser/cart' component={CartShop}/>

				 
			</Switch>
		</div>
	);
}


export default App;
