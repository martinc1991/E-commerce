// React
import React from 'react';
import { useState, useEffect } from 'react';

// React-Router-Dom
import { useRouteMatch, Route } from 'react-router-dom';

// Bootstrap
import { Button } from 'react-bootstrap';

// CSS
import s from '../../styles/ProductDet.module.css';

// Componentes
import Navegacion from '../Navegacion/Navegacion';
import Footer from '../Footer/Footer';
import Slider from '../Slider/Slider';

// Iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

// Axios
import axios from 'axios';

const url = 'localhost:3001';

// <---------------------------Componente--------------------------->
const Product = (props) => {
	const match = useRouteMatch();

	const { id } = match.params;
	console.log(id);

	const [product, setProducts] = useState({});

	const getProduct = () => {
		axios
			.get(`http://${url}/products`)
			.then((res) => {
				if (res) {
					// console.log('getProduct ejecutada');
					// console.log(res.data.data);
					var arrayProductos = res.data.data;
					// console.log(arrayProductos);
					var found = arrayProductos.filter((p) => {
						return p.id == id;
					});
					console.log(found[0]);
					setProducts(found[0]);
					return;
				} else {
					console.log('No hay Datos');
				}
			})
			.catch((err) => {
				console.log('Error');
			});
	};

	useEffect(() => {
		getProduct();
	}, []);

	// console.log(product);
	return (
		<div>
			<div className={s.cont_prin}>
				<div className={s.cont}>
					<div className={s.cont_img}>
						{/* <Slider /> */}
						<img src={product.image}></img>
					</div>
					<div className={s.cont_info}>
						<h3>{`${product.name}` || `Product Name Here`}</h3>
						<h4>$ {`${product.price}` || `00000d`}</h4>
						<h6>Referencia: {`${product.sku}` || `codReferencia`}</h6>
						<div className={s.icon}>
							<FontAwesomeIcon icon={faStar} size={'1x'} />
							<FontAwesomeIcon icon={faStar} size={'1x'} />
							<FontAwesomeIcon icon={faStar} size={'1x'} />
							<FontAwesomeIcon icon={faStar} size={'1x'} />
							<FontAwesomeIcon icon={faStar} size={'1x'} />
						</div>
						<p>{`${product.description}` || `Descripcion no disponible`}</p>
						<p>
							<span className={s.dim}>Dimensiones:</span> {`${product.dimentions}` || `noDisponible`}
						</p>
						<div className={s.cont_cant}>
							<label for='Cantidad'>Candidad:</label>
							<select name='Cantidad' id='Cantidad' className={s.select}>
								{/* <option value=''>...</option> */}
								<option value='1'>1</option>
								<option value='2'>2</option>
								<option value='3'>3</option>
								<option value='4'>4</option>
								<option value='5'>5</option>
								<option value='6'>6</option>
							</select>
							<h6>{`${product.stock}` || `numStock`} Unidades disponibles</h6>
						</div>
						<div className={s.cont_button}>
							<Button className={s.buttonCom}>Comprar ahora</Button>
							<Button className={s.buttonCar}>Agregar al carrito</Button>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};
export default Product;
