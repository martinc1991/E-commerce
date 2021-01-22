import React, { useState } from 'react';
import * as AiIcons from 'react-icons/ai';
import * as bsIcon from 'react-icons/bi';
import * as faIcons from 'react-icons/fa';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategories, getProductByCategory } from '../../store/actions/category_actions';
// import s from './SideBar.css';

function SideBar({ categories, getCategoryP, getProductByCategoryP }) {
	const [sidebar, setSideBar] = useState(false);

	const showSideBar = () => setSideBar(!sidebar);

	return (
		<div>
			<div className='navbar'>
				<Link to='#' className='menu-bars'>
					<faIcons.FaBars onClick={showSideBar}>
						<h1>Categorias.</h1>
					</faIcons.FaBars>
				</Link>
			</div>
			<nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
				<ul className='nav-menu-items'>
					<li className='navbar-toogle'>
						<Link to='#' className='menu-bars'>
							<AiIcons.AiOutlineClose onClick={showSideBar} />
						</Link>
					</li>
					<li>
						<bsIcon.BiCart />
						<h4>
							<a id='links' href='/products/catalogo'>
								Mostrar todos
							</a>
						</h4>
					</li>
					{categories.map((item, index) => {
						return (
							<li key={index} className={item.cName} onClick={() => getProductByCategoryP(item.name)}>
								<bsIcon.BiCart />
								<span>
									<h4 onClick={showSideBar}>{item.name}</h4>
								</span>
							</li>
						);
					})}
				</ul>
			</nav>
		</div>
	);
}
function mapStateToProps(state) {
	return {
		categories: state.categories,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		getCategoryP: () => dispatch(getCategories()),
		getProductByCategoryP: (name) => dispatch(getProductByCategory(name)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
