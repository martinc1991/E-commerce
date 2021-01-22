import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Col, Image } from 'react-bootstrap';
import ws from '../../multimedia/ws.png';
import s from '../../styles/whatsapp.module.css';

function Contact() {
	const cod = '+' + 569; // Código de país
	const cel = 30112434; // Número telefónico

	return (
		<Col xs={'auto'} className={`${s.contenedorWs}`}>
			<a href={`https://api.whatsapp.com/send?phone=${cod}${cel}`} target='_blank'>
				<Image className={s.size} src={ws} roundedCircle />
			</a>
		</Col>
	);
}

export default Contact;
