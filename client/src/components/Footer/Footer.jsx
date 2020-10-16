import React from 'react';

// Logo
import logo from '../../multimedia/logo.png';

// Bootstrap
import { Col, Navbar, Container, Form, Button, InputGroup, FormControl } from 'react-bootstrap';

// Font Awesome (iconos)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser as userLogin, faShoppingCart as shopCart } from '@fortawesome/free-solid-svg-icons';

// CSS
import s from '../../styles/Footer.module.css';

export default function Footer() {
	return (
		<Navbar className={`${s.footer}`}>
			<Container>
				<Col lg={3}>
					<Navbar.Brand href='#home'>
						{/* Logo */}
						<img className={`${s.logo}`} src={logo}></img>
					</Navbar.Brand>
				</Col>
				<div className={`${s.separador}`}></div>
				<Col lg={6}>
					<h4>Enterate de todas las noticias</h4>
					<p>Dejanos tu correo para que podamos mandarte las ultimas novedades</p>

					<Form>
						<Form.Label>E-Mail</Form.Label>
						<InputGroup className={`d-flex`}>
							{/* Input buscador */}
							<FormControl className={`${s.searchInput} shadow-none`} type='email' placeholder='Ingresa tu E-Mail...' />{' '}
							<InputGroup.Append>
								<Button className={`${s.contenedorSubmit} `} variant='primary' type='submit'>
									<p className={``}>Enviar</p>
								</Button>
							</InputGroup.Append>
						</InputGroup>

						<Form.Text className='text-muted'>Nunca compartiremos tus datos con terceros</Form.Text>
					</Form>
				</Col>
				<div className={`${s.separador}`}></div>
				<Col lg={3} className={'d-flex'}>
					{/* Iconos Redes Sociales */}
					<FontAwesomeIcon className={`flex-fill ${s.userLoginIcon}`} icon={userLogin} size={'lg'} />
					<FontAwesomeIcon className={`flex-fill ${s.shopCartIcon}`} icon={shopCart} size={'lg'} />
					<FontAwesomeIcon className={`flex-fill ${s.shopCartIcon}`} icon={shopCart} size={'lg'} />
					<FontAwesomeIcon className={`flex-fill ${s.shopCartIcon}`} icon={shopCart} size={'lg'} />
				</Col>
			</Container>
		</Navbar>
	);
}
