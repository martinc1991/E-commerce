import React from 'react';
import { Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ProductCard({ name, description, img, price }) {
	return (
		<Card style={{ width: '18rem' }}>
			<Card.Img variant='top' src={img} />
			<Card.Body>
				<Card.Title>{name}</Card.Title>
				<Card.Text>{description}</Card.Text>
				<Card.Title>{price}</Card.Title>
				<Button variant='primary'>Carrito</Button>
				<Button variant='primary'>Comprar</Button>
			</Card.Body>
		</Card>
	);
}
