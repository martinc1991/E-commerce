// Font Awesome (iconos)
import { faShoppingCart as shopCart, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

function ProductCard({ name, description, img, price, id, destacado, stock, addToCartP}) {
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

	return (
		  
			<Card className={stock === 0 ? ` m-2 flex-dark  ${s.productRunOut}`: ` m-2 flex-dark ${s.productCard}` } >
				{stock === 0 && <div className={s.test}><p>AGOTADO</p> </div>}
			<Card.Img variant='top' src={`${img}` || `https://picsum.photos/200`} />
			<Card.ImgOverlay
				className={`p-1 d-flex flex-column align-items-end justify-content-between ${s.productCardHeadingContainer}`}
				onClick={() => {
					console.log(`Redireccionando a la pagina del producto ${id}`);
					window.location.href = `/products/product/${id}`;
				}}
			>
				<Card.Text className={`text-center ${s.productCardHeading}`}>{`${destacadoText}`}</Card.Text>
				{/* <FontAwesomeIcon className={`m-2 ${s.productCardShopCartIcon}`} icon={shopCart} size={'1x'} /> */}
			</Card.ImgOverlay>
			<Card.Body className={`p-2`} className={s.cont_prin} >
				<Card.Title as={Link} to={`/products/product/${id}`} className={`my-1 ${s.productCardTitle}`}>
					{`${name}` || `Product Name`}
				</Card.Title>
				<div className={s.icon}>
							<FontAwesomeIcon icon={faStar} size={'1x'} />
							<FontAwesomeIcon icon={faStar} size={'1x'} />
							<FontAwesomeIcon icon={faStar} size={'1x'} />
							<FontAwesomeIcon icon={faStar} size={'1x'} />
							<FontAwesomeIcon icon={faStar} size={'1x'} />
				</div>
				{/* <Card.Text className={`my-1 ${s.productCardDescription}`}>{`${description}` || `Product Name`} </Card.Text> */}
				<Card.Text className={`my-1 ${s.productCardPrice}`}>{`$ ${price}` || `Product Name`}</Card.Text>
				<Row className={`d-flex justify-content-around `} >
					{stock == 0 ? 
						<Button as={Link} to={`/products/product/${id}`} className={`mb-1 ${s.productCardButton}`}>
							Ver Detalles
						</Button>
					:
					<div className={s.buttons}>
						<Button as={Link} to={`/products/product/${id}`} className={`mb-1 ${s.productCardButton}`}>
						Ver Detalles
						</Button>
						<Button onClick={() => addToCartP(id, 1)} className={`mb-1 ${s.productCardButton2}`}>
						Agregar al carrito
						</Button>
					</div>
						
					}

				</Row>
			</Card.Body>	
		</Card>
		
		

		
	
	);
}


function mapStateToProps(state){
    return {
        
    }
}

function mapDispatchToProps(dispatch){
    return {
        addToCartP : (id, qty) => dispatch(addToCart(id, qty)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
