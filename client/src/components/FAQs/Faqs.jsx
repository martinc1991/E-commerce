import React from 'react';
import { Accordion, Card, Container } from 'react-bootstrap';
import s from '../../styles/faqs.module.css';

export default function Faqs() {
	return (
		<div>
			<Container className={`my-5 ${s.contPrincipal}`}>
				<h1 className={`my-4`}>Preguntas Frecuentes</h1>
				<Accordion defaultActiveKey='0'>
					{/*pregunta 1*/}
					<Card>
						<Accordion.Toggle as={Card.Header} eventKey='1' className={s.Pregunta}>
							<h5>¿Qué es Astra?</h5>
						</Accordion.Toggle>
						<Accordion.Collapse eventKey='1' className={s.Respuesta}>
							<Card.Body>
								<h6>Donde por fin encontrarás todos los productos para tu celular que estabas buscando, además de algunas cosas para cuidarte de COVID.</h6>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
					{/*pregunta 2*/}
					<Card>
						<Accordion.Toggle as={Card.Header} eventKey='2' className={s.Pregunta}>
							<h5>¿Cómo nació Astra?</h5>
						</Accordion.Toggle>
						<Accordion.Collapse eventKey='2' className={s.Respuesta}>
							<Card.Body>
								<h6>Porque tenemos ganas de crecer!</h6>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
					{/*pregunta 3*/}
					<Card>
						<Accordion.Toggle as={Card.Header} eventKey='3' className={s.Pregunta}>
							<h5>¿Puedo ver la tienda sin ser cliente?</h5>
						</Accordion.Toggle>
						<Accordion.Collapse eventKey='3' className={s.Respuesta}>
							<Card.Body>
								<h6>Por supuesto, puedes ver los productos, agregarlos a tu carrito, borrarlos, pero cuando vayas a pagar te vamos a pedir loguearte, para así brindarte un mejor servicio.</h6>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
					{/*pregunta 4*/}
					<Card>
						<Accordion.Toggle as={Card.Header} eventKey='4' className={s.Pregunta}>
							<h5> ¿Qué métodos de pago hay?</h5>
						</Accordion.Toggle>
						<Accordion.Collapse eventKey='4' className={s.Respuesta}>
							<Card.Body>
								<h6>Recibimos MercadoPago y Paypal.</h6>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
				</Accordion>
			</Container>
		</div>
	);
}
