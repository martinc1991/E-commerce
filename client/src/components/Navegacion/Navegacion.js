import React from 'react';
// Logo
import logo from '../../multimedia/logo.png';

// Bootstrap
import { Navbar, Nav, Container, Col } from 'react-bootstrap';

// CSS
import s from '../../styles/Navbar.module.css';

// Font Awesome (iconos)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser as userLogin, faShoppingCart as shopCart } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../SearchBar/SearchBar';

export default function Navegacion() {
	return (
		<Navbar className={`${s.navbar} sticky-top`}>
			<Container>
				<Col lg={1}>
					<Navbar.Brand href='#home'>
						{/* Logo */}
						<img className={`${s.logo}`} src={logo}></img>
					</Navbar.Brand>
				</Col>
				{/* Sector central del navbar: links y buscador */}
				<Col lg={6} className={`d-flex`}>
					{/* Link: Categorias */}
					<Nav.Link href='#' className={`flex-fill ${s.navbarLinks}`}>
						Categorias
					</Nav.Link>
					{/* Link: FAQs */}
					<div className={`align-self-center ${s.separador}`}></div>
					<Nav.Link href='#' className={`flex-fill ${s.navbarLinks}`}>
						FAQs
					</Nav.Link>
					{/* Link: Contacto */}
					<div className={`align-self-center ${s.separador}`}></div>
					<Nav.Link href='#' className={`flex-fill ${s.navbarLinks}`}>
						Contacto
					</Nav.Link>
					{/* Link: Ayuda */}
					<div className={`align-self-center ${s.separador}`}></div>
					<Nav.Link href='#' className={`flex-fill ${s.navbarLinks}`}>
						Ayuda
					</Nav.Link>
					{/* Link: ADMIN */}
					<div className={`align-self-center ${s.separador}`}></div>
					<Nav.Link href='#' className={`flex-fill ${s.navbarLinks}`}>
						ADMIN
					</Nav.Link>
				</Col>

				<Col className='contenedorSearchInput' lg={3}>
					<SearchBar></SearchBar>
				</Col>

				<Col lg={1} className={'d-flex'}>
					<FontAwesomeIcon className={`flex-fill ${s.userLoginIcon}`} icon={userLogin} size={'1x'} />
					<FontAwesomeIcon className={`flex-fill ${s.shopCartIcon}`} icon={shopCart} size={'1x'} />
				</Col>
			</Container>
		</Navbar>
	);
}
