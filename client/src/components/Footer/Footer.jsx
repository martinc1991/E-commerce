import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
// Font Awesome (iconos)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
// Bootstrap
import { Button, Col, Container, Form, FormControl, InputGroup, Navbar, Row } from 'react-bootstrap';
// React -Routes
import { Link } from 'react-router-dom';

// Logo
import logo from '../../multimedia/logo.png';
// CSS
import s from '../../styles/Footer.module.css';

export default function Footer() {
	return (
		<Navbar className={`${s.footer} justify-content-center pt-lg-5 mt-auto`}>
			<Container className={`d-flex flex-column`}>
				<Row className={`${s.bordeRojo} justify-content-between align-items-center w-100`}>
					<Col xs={12} lg={2} className={`${s.bordeVerde} d-flex order-3 order-lg-1 align-items-center justify-content-center  p-0 mt-5 mt-lg-0`}>
						<Navbar.Brand className={`p-0 m-0`}>
							{/* Logo */}
							<Link to='/'>
								<img className={`${s.logo}`} src={logo}></img>
							</Link>
						</Navbar.Brand>
					</Col>
					<div className={`${s.separador} d-none d-lg-block order-2 order-lg-2`}></div>
					<Col xs={12} lg={6} className={`${s.bordeVerde} text-center text-sm-left mt-3 my-lg-0 py-4 d-flex flex-column order-1 order-lg-3 justify-content-center justify-content-md-start`}>
						<p className={`${s.footerTitle}`}>Enterate de todas las noticias</p>
						<p className={`${s.footerBody}`}>Dejanos tu correo para que podamos mandarte las ultimas novedades.</p>
						<Form>
							<Form.Label className={`${s.footerBody}`}>E-Mail</Form.Label>
							<InputGroup className={`d-flex`}>
								{/* Input buscador */}
								<FormControl className={`${s.searchInput} shadow-none`} type='email' placeholder='Ingresa tu E-Mail...' />{' '}
								<InputGroup.Append>
									<Button className={`${s.contenedorSubmit} `} variant='primary' type='submit'>
										<p className={`${s.footerBody}`}>Enviar</p>
									</Button>
								</InputGroup.Append>
							</InputGroup>

							<Form.Text className='text-muted'>Nunca compartiremos tus datos con terceros.</Form.Text>
						</Form>
					</Col>
					<div className={`${s.separador} d-none d-lg-block order-2 order-lg-4`}></div>
					<Col xs={12} lg={2} className={`${s.bordeVerde} order-2 order-lg-5 d-flex justify-content-around align-items-center`}>
						{/* Iconos Redes Sociales */}{' '}
						<a href='https://www.instagram.com/fordiscover_hl/' className={s.instagram}>
							<FontAwesomeIcon icon={faInstagram} size='2x' />
						</a>
						<a href='https://twitter.com/ecommercehenry1' className={s.twitter}>
							<FontAwesomeIcon icon={faTwitter} size='2x' />
						</a>
						{/*	<FontAwesomeIcon className={`flex-fill ${s.userLoginIcon}`} icon={userLogin} size={'lg'} />
					<FontAwesomeIcon className={`flex-fill ${s.shopCartIcon}`} icon={shopCart} size={'lg'} />
					<FontAwesomeIcon className={`flex-fill ${s.shopCartIcon}`} icon={shopCart} size={'lg'} />
					<FontAwesomeIcon className={`flex-fill ${s.shopCartIcon}`} icon={shopCart} size={'lg'} />*/}
					</Col>
				</Row>
				<Row className={`${s.contDerechos} ${s.bordeAmarillo} mt-3 mb-2 pt-2 w-100 text-center`}>
					<Col xs={12}>
						<p className={`${s.textoDerechos}`}>Todos los derechos reservados - Astra - 2020</p>
					</Col>
				</Row>
			</Container>
		</Navbar>
	);
}
