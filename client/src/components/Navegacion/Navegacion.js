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
import { connect } from 'react-redux'

// React -Routes
import { Link } from 'react-router-dom';

function Navegacion(props) {
	
	console.log('********props nav ***************')
	console.log(props.cartP[0])
	return (
		<Navbar className={`${s.navbar} sticky-top`}>
			<Container style={{ maxWidth: '1200px' }}>
				<Col lg={1}>
					<Navbar.Brand   as={Link} to='/'>
						{/* Logo */}
						<img className={`${s.logo}`} src={logo}></img>
					</Navbar.Brand>
				</Col>

				{/* Sector central del navbar: links y buscador */}
				<Col lg={6} className={`d-flex`}>
					{props.links.map((enlace) => {
						return (
							<div key={enlace.text} className={`flex-fill ${s.separador}`}>
								<Nav.Link href='#' as={Link} to={enlace.to} className={`${s.navbarLinks}`}>
									{enlace.text}
								</Nav.Link>
							</div>
						);
					})}
					{/* Link: Categorias */}
				</Col>

				<Col className='contenedorSearchInput' lg={3}>
					{props.showSearchbar && <SearchBar onSearch={props.onSearch}></SearchBar>}
					{/* <SearchBar></SearchBar> */}
				</Col>

				<Col lg={1} className={'d-flex'}>
					{!!props.showSearchbar && <FontAwesomeIcon className={`flex-fill ${s.userLoginIcon}`} icon={userLogin} size={'1x'} />}
					
						
					{!!props.showSearchbar && <div className={s.contCart}><Link to='/users/cart'><FontAwesomeIcon className={`flex-fill ${s.shopCartIcon}`} icon={shopCart} size={'1x'} /></Link><span className={s.shopCartIconSpan}>{props.cartP[0] ? props.cartP[0].products.length: 0}</span></div>}
					
					{!props.showSearchbar && (
						<Nav.Link href='#' as={Link} to={'/'} className={`${s.navbarLinks}`}>
							Logout
						</Nav.Link>
					)}
				</Col>
			</Container>
		</Navbar>
	);
}


function mapStateToProps(state){
    return {
        cartP: state.cart,
    }
}

function mapDispatchToProps(dispatch){
    return {

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Navegacion);