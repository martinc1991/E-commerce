// React
import React from 'react';
import { useState, useEffect } from 'react';

// React-Router-Dom
import { useRouteMatch, Route, useHistory } from 'react-router-dom';

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

import { connect } from 'react-redux';
import {
    getProducts,
}from '../../store/actions/actions'

const url = 'localhost:3001';

// <---------------------------Componente--------------------------->
const Product = ({ productsP,getProductP }) => {
	
	const [qty, setQty] = useState(1)
	const match = useRouteMatch();
	const history = useHistory();
	const { id } = match.params;
	let objP = {}
	var objProduct = productsP.find(d => { return d.id == id;})

	console.log(objProduct)
	for(let pr in objProduct){
		var prop = pr
		objP[prop] = objProduct[pr]
	}


	const handlerAddToCart = (id)=>{
		history.push(`/users/${id}/cart`)
	}

	console.log(objP)
	useEffect(() => {
		getProductP();
	}, []);


	return (
		<div>
			 <div className={s.cont_prin}>
				<div className={s.cont}>
					<div className={s.cont_img}>
						
						<img src={objP.image}></img>
					</div>
					<div className={s.cont_info}>
						<h3>{`${objP.name}` || `Product Name Here`}</h3>
						<h4>$ {`${objP.price}` || `00000d`}</h4>
						<h6>Referencia: {`${objP.sku}` || `codReferencia`}</h6>
						<div className={s.icon}>
							<FontAwesomeIcon icon={faStar} size={'1x'} />
							<FontAwesomeIcon icon={faStar} size={'1x'} />
							<FontAwesomeIcon icon={faStar} size={'1x'} />
							<FontAwesomeIcon icon={faStar} size={'1x'} />
							<FontAwesomeIcon icon={faStar} size={'1x'} />
						</div>
						<p>{`${objP.description}` || `Descripcion no disponible`}</p>
						<p>
							<span className={s.dim}>Dimensiones:</span> {`${objP.dimentions}` || `noDisponible`}
						</p>
						<div className={s.cont_cant}>
							<label for='Cantidad'>Candidad:</label>
							<select name='Cantidad' id='Cantidad' className={s.select} value={qty} onChange={(e) => {setQty(e.target.value)}}>
								{[...Array(objP.stock).keys()].map(x => {
									return (
										<option value={x+1}>{x+1}</option>
									)
								})}
							</select>
							{objP.stock > 0 ? <h6> {objP.stock} Unidades Disponibles</h6> : <h4 className={s.agotadoProct}> Producto Agotado</h4>}
						</div>
						{objP.stock > 0 && 
							<div className={s.cont_button}>
								<Button className={s.buttonCom}>Comprar ahora</Button>
								<Button className={s.buttonCar} onClick={() => handlerAddToCart(objP.id)}>Agregar al carrito</Button>
							</div>
						}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};


function mapStateToProps(state){
    return {
        productsP: state.products
    }
}
function mapDispatchToProps(dispatch){
    return {
        getProductP : () => dispatch(getProducts()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);

