// Font Awesome (iconos)
import { faShoppingCart as shopCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Row } from 'react-bootstrap';
import React from 'react';
// React Router
import { Link } from 'react-router-dom';
// CSS
import s from '../../styles/ProductCard.module.css';

export default function ProductCard({ name, description, img, price, id, destacado, stock }) {
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
		<Card className={` m-2 flex-dark  ${s.productCard}` }  bg={  stock>0 ? `fill`: `fill` }  >
			<Card.Img variant='top' src={`${img}` || `https://picsum.photos/200`} />
			<Card.ImgOverlay
				className={`p-1 d-flex flex-column align-items-end justify-content-between ${s.productCardHeadingContainer}`}
				onClick={() => {
					console.log(`Redireccionando a la pagina del producto ${id}`);
					window.location.href = `/products/product/${id}`;
				}}
			>
				<Card.Text className={`text-center ${s.productCardHeading}`}>{`${destacadoText}`}</Card.Text>
				<FontAwesomeIcon className={`m-2 ${s.productCardShopCartIcon}`} icon={shopCart} size={'1x'} />
			</Card.ImgOverlay>
			<Card.Body className={`p-2`}>
				<Card.Title as={Link} to={`/products/product/${id}`} className={`my-1 ${s.productCardTitle}`}>
					{`${name}` || `Product Name`}
				</Card.Title>
				<Card.Text className={`my-1 ${s.productCardDescription}`}>{`${description}` || `Product Name`} </Card.Text>
				<Card.Text className={`my-1 ${s.productCardPrice}`}>{`$ ${price}` || `Product Name`}</Card.Text>
				<Row className={`d-flex justify-content-around`}>
					{stock == 0 ? 
						<Button as={Link} to={`/products/product/${id}`} className={`mb-1 ${s.productCardButtonAgot}`}>
							Agotado!
						</Button>
					:
						<Button as={Link} to={`/products/product/${id}`} className={`mb-1 ${s.productCardButton}`}>
							Ver mas
						</Button>
					}

				</Row>
			</Card.Body>
		</Card>
	);
}
