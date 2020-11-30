// Font Awesome (iconos)
import { faCartPlus as shopCart, faStar, faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Hooks
import { useState, useEffect } from 'react';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Row } from 'react-bootstrap';
import React from 'react';
// React Router
import { Link } from 'react-router-dom';
// CSS
import s from '../../styles/ProductCard.module.css';
import { connect } from 'react-redux'
import { addToCart } from '../../store/actions/cart_actions';
import { FaDivide } from 'react-icons/fa';

function ProductCard({ name, description, img, price, id, destacado, stock, reviews, addToCartP, userLoggedP, setShow}) {
	// console.log('name: ' + name);
	// console.log('description: ' + description);
	// console.log('img: ' + img);
	// console.log('price: ' + price);
	// console.log('id: ' + id);
	// console.log('destacado: ' + destacado);
	console.log('destacado: ' + stock);

	var destacadoText = '';

	if (destacado) {
		destacadoText = '50%';
	}

	const getRate = (reviews) => {
		let rate = 0;
		if (reviews && reviews.length > 0){
			reviews.forEach(review => {
				rate += review.rate;
			})
			rate /= reviews.length;
		}
		return rate;
	}
	const rate = getRate(reviews);

	const getStarWidth = (rate) =>{
		if (rate > 2.5) rate*=18;
		else if (rate <= 2.5) rate *= 18.2;
		return rate;
	}

	const starWidth = getStarWidth(rate);

	const roundedRate = Math.round(rate * 10)/10;
	const fixedRate = roundedRate.toFixed(1);

	//let rate = 18.2*rating;
	return (
			<Card className={stock === 0 ? ` m-2 flex-dark  ${s.productRunOut}`: ` m-2 flex-dark ${s.productCard}` } >
				{stock === 0 && <div className={s.runOut}><p>AGOTADO</p> </div>}
			<Card.Img variant='top' src={`${img}` || `https://picsum.photos/200`} className={s.productCardImg}/>
			{stock == 0 ?
			<></>
			:
				<Card.ImgOverlay

					className={`p-1 d-flex flex-column align-items-end justify-content-between ${s.productCardHeadingContainer}`}
					onClick={() => {
						console.log(`Redireccionando a la pagina del producto ${id}`);
						window.location.href = `/products/product/${id}`;
					}}
				>
					<div>
					<FontAwesomeIcon className={`m-2 ${s.productCardDetailIcon}`} icon={faSearchPlus} size={'1x'} />
					</div>
					
				</Card.ImgOverlay>
			}
			<Card.Body  className={s.cont_prin} >
				<div as={Link} to={`/products/product/${id}`} className={`my-1 ${s.productCardTitle}`}>
					{`${name}` || `Product Name`}
				</div>
				<div className={s.icon}>
					<div className={s.emptyStars}>
						<FontAwesomeIcon icon={faStar} size={'1x'} />
						<FontAwesomeIcon icon={faStar} size={'1x'} />
						<FontAwesomeIcon icon={faStar} size={'1x'} />
						<FontAwesomeIcon icon={faStar} size={'1x'} />
						<FontAwesomeIcon icon={faStar} size={'1x'} />
					</div>
					<div className={s.fullStarsRate} style={{width: starWidth + 'px'}}>
						<div className={s.fullStars}>
							<FontAwesomeIcon icon={faStar} size={'1x'} />
							<FontAwesomeIcon icon={faStar} size={'1x'} />
							<FontAwesomeIcon icon={faStar} size={'1x'} />
							<FontAwesomeIcon icon={faStar} size={'1x'} />
							<FontAwesomeIcon icon={faStar} size={'1x'} />
						</div>
					</div>	
				</div>	
				{/* <Card.Text className={`my-1 ${s.productCardDescription}`}>{`${description}` || `Product Name`} </Card.Text> */}
				<div className={s.contPI}>				
				<Card.Text className={`my-1 ${s.productCardPrice}`}>
					{stock == 0 ? <div></div> : <div> {`$ ${price}` || `Product Name`} </div>}
				</Card.Text>
				<div className={s.cont_I}>
					{ stock == 0 ?
					<div></div>
					:
				<>
				<Button onClick={() => {addToCartP(id, 1, userLoggedP ? userLoggedP.id : 1); setShow(true)}} className={`mb-1 ${s.productCardButton2}`}>
				 <div>
				 <h6 className={s.h6}>Carrito</h6> 
				 </div>
				 <div>
				 <FontAwesomeIcon className={` ${s.productCardShopCartIcon}`} icon={shopCart}  />
				 </div>
				 				 
				</Button>
				
				</>
			}
				</div>
				</div>
				<Row className={`d-flex justify-content-around `} >
					{stock == 0 ? 
						<div className={s.cont_stockButon}>				
						<Button as={Link} to={`/products/product/${id}`} className={`mb-1 ${s.productStockButton}`}>
							Ver Detalles
						</Button>
						</div>
					:
					<div className={s.buttons}>
						<Button as={Link} to={`/products/product/${id}`} className={`mb-1 ${s.productCardButton}`}>
						Ver Detalles
						</Button>
						<Button onClick={() => addToCartP(id, 1, userLoggedP && userLoggedP.id)} className={`mb-1 ${s.productCardButton2}`}>
						Agregar al carrito
						</Button>
					</div>
						
					}
				</Row>
			</Card.Body>
			<div className={s.fixedRate} ><h6>{fixedRate} ({reviews && reviews.length} opiniones)</h6></div>	
		</Card>
	);
}


function mapStateToProps(state){
    return {
        userLoggedP : state.userLogged,
    }
}

function mapDispatchToProps(dispatch){
    return {
        addToCartP : (id, qty, userID) => dispatch(addToCart(id, qty, userID)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
