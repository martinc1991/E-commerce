import React from 'react';
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import s from '../styles/styles.module.css';

const Menu = () => {
	return (
		<div>
			<Navbar bg='dark' variant='dark'>
				<Navbar.Brand href='#home'>G4-ADMIN</Navbar.Brand>
				<Nav className='mr-auto'>
					<li className={s.list__nav}>
						<Link to='/admin'>Home</Link>
					</li>
					<li className={s.list__nav}>
						<Link to='/admin/product'>Product</Link>
					</li>
					<li className={s.list__nav}>
						<Link to='/admin/category'>Categorys</Link>
					</li>
				</Nav>
				<Form inline>
					<FormControl type='text' placeholder='Search' className='mr-sm-2' />
					<Button variant='outline-info'>Search</Button>
				</Form>
				<Nav.Link as={Link} to='/'>
					Logout
				</Nav.Link>
			</Navbar>
		</div>
	);
};

export default Menu;
