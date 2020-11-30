import React from 'react';
import { useHistory } from 'react-router-dom';

// Logo
import logo from '../../multimedia/logo.png';

// Bootstrap
import { Navbar, Nav, Container, Col, NavDropdown } from 'react-bootstrap';

// CSS
import s from '../../styles/Navbar.module.css';

// Font Awesome (iconos)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser as userLogin, faSignInAlt as signIn, faShoppingCart as shopCart, faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../SearchBar/SearchBar';
import UserList from '../UserList/UserList.js';
import { connect } from 'react-redux';

// React -Routes
import { Link } from 'react-router-dom';
//Cookie
import Cookie from 'js-cookie';

//Actions
import { logout } from '../../store/actions/loginActions';

// <--------------------------- IMPORTS --------------------------->

function Navegacion(props) {
	// console.log('State User Loaded');
	// console.log(props.userLogin);
	// console.log(props.cartP[0]);
	console.log(props);

	// <--------------------------- CONSTANTES --------------------------->
	const history = useHistory();

	// <--------------------------- FUNCIONES --------------------------->
	const handlerClick = () => {
		window.location = '/';
		props.loginActionP();
		Cookie.remove('userLoad');
		Cookie.remove('cartItems');
		return;
	};

	const handleHamburgerIcon = function () {
		// Esta funcion hace que cambie el icono cuando la barra de navegacion se depliega o se colapsa
		var botonHamburguesa = document.getElementById('hamburgerButton');
		var botonHamburguesa2 = document.getElementById('hamburgerButton2');
		// console.log(botonHamburguesa);
		botonHamburguesa.classList.toggle('d-none');
		botonHamburguesa2.classList.toggle('d-none');
		console.log(document.getElementById('navbarCompleto'));
	};

	const initialStateHamburgerIcons = function () {
		// Cambia el estado del icono de desplegar cada vez que se selecciona un link
		var botonHamburguesa = document.getElementById('hamburgerButton');
		var botonHamburguesa2 = document.getElementById('hamburgerButton2');
		botonHamburguesa.classList.remove('d-none');
		botonHamburguesa2.classList.add('d-none');
	};
	// <--------------------------- FUNCIONES --------------------------->

	// console.log('********props nav ***************');
	// console.log(props.cartP[0]);
	// / <--------------------------- RENDER --------------------------->

	return (
		<div>
			<Navbar id='navbarCompleto' collapseOnSelect expand='md' onSelect={initialStateHamburgerIcons} className={props.showSearchbar ? `justify-content-center ${s.navbar} py-0 px-2` : `justify-content-center ${s.navbarAdmin} py-0 px-2`}>
				<Container className={`${s.containerPrincipal} ${s.bordeVerde} d-flex m-0 p-0`}>
					<Navbar.Brand as={Link} to='/' className={`${s.bordeVerde} mx-0 ml-1`}>
						{/* Logo */}
						<img className={`${s.logo}`} src={logo}></img>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls='responsive-navbar-nav' className={`order-2`}>
						<FontAwesomeIcon id={`hamburgerButton`} className={`${s.bordeVerde} flex-fill ${s.plusIcon}`} icon={faBars} size={'1x'} onClick={handleHamburgerIcon} />
						<FontAwesomeIcon id={`hamburgerButton2`} className={`${s.bordeVerde} flex-fill ${s.plusIcon} d-none mr-1`} icon={faTimes} size={'1x'} onClick={handleHamburgerIcon} />
					</Navbar.Toggle>
					<Navbar.Collapse id='responsive-navbar-nav' className={` ${s.contColapse} justify-content-around order-3 order-md-1`}>
						{/* Aca adentro van los enlaces que se colapsan en pantallas mas pequenias */}
						<Nav className={`d-flex flex-row pl-lg-5 ${s.bordeRojo}`}>
							{/* Camilo */}
							{props.userLogin ? (
								props.userLogin.role === 'client' ? (
									<Col lg={6} className={`d-flex`}>
										{props.linksU.map((enlace, i, arr) => {
											return (
												<div key={enlace.text} className={props.showSearchbar && arr[i + 1] ? `${s.separador} flex-fill d-flex flex-column justify-content-center mb-2 mb-md-0` : !props.showSearchbar && arr[i + 1] ? `${s.separadorAdmin} flex-fill d-flex flex-column justify-content-center mb-2 mb-md-0` : props.showSearchbar ? `flex-fill d-flex flex-column justify-content-center mb-2 mb-md-0` : !props.showSearchbar ? `flex-fill d-flex flex-column justify-content-center mb-2 mb-md-0` : ``}>
													<Nav.Link href='#' as={Link} to={enlace.to} className={props.showSearchbar ? `${s.navbarLinks}` : `${s.navbarLinksAdmin}`}>
														{enlace.text}
													</Nav.Link>
												</div>
											);
										})}
										{/* Link: Categorias */}
									</Col>
								) : (
									<Col lg={6} className={`d-flex flex-column flex-sm-row`}>
										{props.linksA.map((enlace, i, arr) => {
											return (
												<div key={enlace.text} className={props.showSearchbar && arr[i + 1] ? `${s.separador} flex-fill d-flex flex-column justify-content-center mb-2 mb-md-0 border-0` : !props.showSearchbar && arr[i + 1] ? `${s.separadorAdmin} flex-fill d-flex flex-column justify-content-center mb-2 mb-md-0 border-0` : props.showSearchbar ? `flex-fill d-flex flex-column justify-content-center mb-2 mb-md-0 border-0` : !props.showSearchbar ? `flex-fill d-flex flex-column justify-content-center mb-2 mb-md-0 border-0` : ``}>
													<Nav.Link href='#' as={Link} to={enlace.to} className={props.showSearchbar ? `${s.navbarLinks}` : `${s.navbarLinksAdmin}`}>
														{enlace.text}
													</Nav.Link>
												</div>
											);
										})}
										{/* Link: Categorias */}
									</Col>
								)
							) : (
								<Col lg={6} className={`d-flex`}>
									{props.linksU.map((enlace, i, arr) => {
										return (
											<div key={enlace.text} className={props.showSearchbar && arr[i + 1] ? `${s.separador} flex-fill d-flex flex-column justify-content-center mb-2 mb-md-0` : !props.showSearchbar && arr[i + 1] ? `${s.separadorAdmin} flex-fill d-flex flex-column justify-content-center mb-2 mb-md-0` : props.showSearchbar ? `flex-fill d-flex flex-column justify-content-center mb-2 mb-md-0` : !props.showSearchbar ? `flex-fill d-flex flex-column justify-content-center mb-2 mb-md-0` : ``}>
												<Nav.Link href='#' as={Link} to={enlace.to} className={props.showSearchbar ? `${s.navbarLinks}` : `${s.navbarLinksAdmin}`}>
													{enlace.text}
												</Nav.Link>
											</div>
										);
									})}
									{/* Link: Categorias */}
								</Col>
							)}
						</Nav>
						{/* SerachBar */}
						{props.showSearchbar && (
							<Col xs={10} sm={6} md={4} className={`${s.bordeAmarillo} mb-2 my-md-0 px-0 ml-0 mr-md-4 ml-auto mr-auto`}>
								<SearchBar onSearch={props.onSearch}></SearchBar>
							</Col>
						)}
					</Navbar.Collapse>
					{/* user login icons y carrito y demas */}
					{!props.userLogin ? (
						<div id='impostor' className={`${s.bordeAmarillo} order-1 order-md-3 mr-md-3`}>
							{props.showSearchbar && (
								<Col xs={`auto`} className={`${s.bordeVerde} order-1 order-md-3 d-flex justify-content-between justify-content-lg-around`}>
									<UserList showSearchbar={props.showSearchbar} userLogin={props.userLogin}></UserList>
									{/* Users */}
									{/* <Link to='/users'>{!!props.showSearchbar && <FontAwesomeIcon className={`flex-fill ${s.userLoginIcon} mr-3`} icon={userLogin} size={'1x'} />}</Link> */}
									{/* Login */}
									{/* <Link to='/login'>{!!props.showSearchbar && <FontAwesomeIcon className={`flex-fill ${s.userLoginIcon} mx-2`} icon={signIn} size={'1x'} />}</Link> */}
									{!!props.showSearchbar && (
										<div className={`${s.contCart} flex-fill mr-2`}>
											<Link to='/users/cart'>
												<FontAwesomeIcon className={`flex-fill ${s.shopCartIcon}`} icon={shopCart} size={'1x'} />
											</Link>
											<span className={s.shopCartIconSpan}>{props.cartP[0] ? props.cartP[0].products.length : 0}</span>
										</div>
									)}
								</Col>
							)}
							{!props.showSearchbar && (
								<Col className={`order-1 order-lg-3`}>
									<Nav.Link href='#' as={Link} to={'/'} className={`${s.navbarLinksAdmin} ${s.bordeVerde} `}>
										Logout
									</Nav.Link>
								</Col>
							)}
						</div>
					) : (
						<div id='impostor' className={`${s.bordeRojo} order-1 order-md-3 mr-md-3`}>
							<Col xs={`auto`} className={`${s.bordeAmarillo} mx-0 px-0 order-1 order-md-3 d-flex justify-content-between justify-content-lg-around`}>
								{
									<div className={`${s.contProfile}`}>
										{props.userLogin.role === 'admin' ? (
											<Col className={`d-flex flex-column px-0 mx-0`}>
												<span className={`${s.textProfile} text-center`}>Admin </span>
											</Col>
										) : (
											<div></div>
										)}
										<UserList 
										linksU={props.linksU}
										linksA={props.linksA}
										showSearchbar={props.showSearchbar} 
										userLogin={props.userLogin} 
										handlerClick={handlerClick}>

										</UserList>
										{!!props.showSearchbar && (
											<div className={s.contCart}>
												<Link to='/users/cart'>
													<FontAwesomeIcon className={`flex-fill ${s.shopCartIcon}`} icon={shopCart} size={'1x'} />
												</Link>
												<span className={s.shopCartIconSpan}>{props.cartP[0] ? props.cartP[0].products.length : 0}</span>
											</div>
										)}
									</div>
								}
							</Col>
						</div>
					)}
					
					

					{/* Mio */}
					{/* Iconos de carrito y login */}
				</Container>
			</Navbar>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		cartP: state.cart,
		userLogin: state.userLogged,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		loginActionP: () => dispatch(logout()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Navegacion);
