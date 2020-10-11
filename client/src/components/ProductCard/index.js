import React from 'react';

//Bootstrap
import { Button, Card, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Font Awesome (iconos)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser as userLogin, faShoppingCart as shopCart } from '@fortawesome/free-solid-svg-icons';

// CSS
import s from '../../styles/ProductCard.module.css';

export default function ProductCard({ name, description, img, price }) {
	return (
		<Card className={`m-5 ${s.productCard}`}>
			<Card.Img variant='top' src={'https://picsum.photos/200'} />
			<Card.ImgOverlay className={`p-1 d-flex flex-column align-items-end justify-content-between ${s.productCardHeadingContainer}`}>
				<Card.Text className={`text-center ${s.productCardHeading}`}>Destacado</Card.Text>
				<FontAwesomeIcon className={`m-2 ${s.productCardShopCartIcon}`} icon={shopCart} size={'2x'} />
			</Card.ImgOverlay>
			<Card.Body className={`p-2`}>
				<Card.Title className={`my-1 ${s.productCardTitle}`}>Product Name</Card.Title>
				<Card.Text className={`my-1 ${s.productCardDescription}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate sapiente fuga, consequuntur nemo alias minima? </Card.Text>
				<Card.Text className={`my-1 ${s.productCardPrice}`}>$ 1500</Card.Text>
				<Row className={`d-flex justify-content-around`}>
					<Button className={`mb-1 ${s.productCardButton}`}>Comprar</Button>
				</Row>
			</Card.Body>
		</Card>
	);
}

{
	/* <Card style={{ width: '18rem' }}>
	<Card.Img variant='top' src='holder.js/100px180' />
	<Card.Body>
		<Card.Title>Card Title</Card.Title>
		<Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
		<Button variant='primary'>Go somewhere</Button>
	</Card.Body>
</Card>; */
}
