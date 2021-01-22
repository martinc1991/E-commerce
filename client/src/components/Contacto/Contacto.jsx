import React from 'react';
import { Card, Container } from 'react-bootstrap';

export default function Contacto() {
	return (
		<div className={`d-flex flex-row d-flex justify-content-between`}>
			<div style={{ width: '24rem', marginTop: '50px', marginLeft: '50px' }}>
				<Container>
					<iframe src='https://docs.google.com/forms/d/e/1FAIpQLSdjOiVz4aYIimh9zrK7Nru5SzjPTr9p-VSZADnKr7HuJJoXZg/viewform?embedded=true' width='640' height='850' frameborder='20px' marginheight='20px' marginwidth='4px' title='title'>
						Cargando…
					</iframe>
				</Container>
			</div>

			<div className={`p-1 margin-top:100px border-radius:20px  `}>
				<Card style={{ width: '24rem', marginTop: '100px', borderRadius: '20px', marginRight: '100px' }}>
					<iframe style={{ height: '20rem', borderRadius: '20px' }} src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5971.231596040454!2d-109.42844439848862!3d-27.14006480150786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9947fb0217260611%3A0xc7614812f982df72!2sAhu%20Tahai!5e0!3m2!1ses-419!2scl!4v1603736300816!5m2!1ses-419!2scl' title='title' />
					<Card.Body>
						<Card.Title className={`font-weight-bold`}>ASTRA</Card.Title>
						<Card.Text>
							<ul className={`list-unstyled mb-0`}>
								<li>
									<i className={`fas fa-map-marker-alt fa-2x`}></i>
									<p>Ahu Tahai, Hanga Roa, Isla de Pascua, Valparaíso, Chile</p>
								</li>

								<li>
									<i className={`fas fa-phone mt-4 fa-2x`}></i>
									<p>Telefono: +56 9 30112434</p>
								</li>

								<li>
									<i className={`fas fa-envelope mt-4 fa-2x`}></i>
									<p>
										email: <span className={`font-italic`}> ecommercehenrylabs@gmail.com</span>
									</p>
								</li>
							</ul>
						</Card.Text>
						{/*<Button variant="primary">Go somewhere</Button>*/}
					</Card.Body>
				</Card>
			</div>
		</div>
	);
}
