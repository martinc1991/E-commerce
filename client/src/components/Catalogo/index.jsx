import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Toast } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import catEmpty from '../../multimedia/empty.jpg';
import { getCategories, getProductByCategory } from '../../store/actions/category_actions';
import { getProducts } from '../../store/actions/product_actions';
import s from '../../styles/catalogo.module.css';
import Filter from '../Filter/index';
import Page from '../Pagination/index.jsx';
import ProductCard from '../ProductCard/index';

const Catalogo = ({ products, productsP, categories, getCategoryP, getProductP, onSearch, getProductByCategoryP }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(8);

	// console.log(productsP);
	// console.log(products);

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPostsCat = productsP.slice(indexOfFirstPost, indexOfLastPost);
	const currentPostsSearch = products.slice(indexOfFirstPost, indexOfLastPost);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);
	const [show, setShow] = useState(false);

	// const handlerSelect = (e) => {
	// 	const catName = e.target.value;
	// 	let obj = {
	// 		[e.target.value]: e.target.checked,
	// 	};
	// 	if (obj[e.target.value] === false) {
	// 		getProductP();
	// 	} else {
	// 		console.log(obj);
	// 		getCategoryP();
	// 		console.log(catName);
	// 		getProductByCategoryP(catName);
	// 	}
	// };

	useEffect(() => {
		getProductP();
		getCategoryP();
	}, []);

	return (
		<div className={s.contPrincipal}>
			{productsP.length === 0 ? (
				<div></div>
			) : (
				<Col className={s.barraC} xs={12} md={2} lg={2}>
					<Filter></Filter>
				</Col>
			)}
			<Col xs={12} md={10} lg={10}>
				{/*<h5><a href="/products/catalogo" className={s.title5}>Mostrar todos</a></h5>*/}
				{products.length === 0 ? (
					productsP.length === 0 ? (
						<>
							<div className={s.catEmpty}>
								{/* <img src={catEmpty} alt='alt'></img> */}
								<h1>¡UPS! PARECE QUE NO HAY NADA CARGADO EN EL CATÁLOGO AÚN</h1>
								<h6>Por favor, intenta de nuevo más tarde</h6>
								<Link className={s.link} to='/'>
									Seguir navegando
								</Link>
							</div>
						</>
					) : (
						<Container className={s.conteiner}>
							<Row className={s.cont_prin_card}>
								{currentPostsCat.map((p, i) => {
									return (
										<Col sm={6} md={4} lg={3} key={i}>
											<ProductCard id={p.id} name={p.name} description={p.description} img={p.image} price={p.price} stock={p.stock} reviews={p.reviews} setShow={setShow} />
										</Col>
									);
								})}
							</Row>
							<Page postsPerPage={postsPerPage} totalPosts={productsP.length} paginate={paginate} />
							<Row>
								<Col xs={6}>
									<Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
										<Toast.Header>
											<img src='holder.js/20x20?text=%20' className='rounded mr-2' alt='' />
											<strong className='mr-auto'>Bootstrap</strong>
											<small>11 mins ago</small>
										</Toast.Header>
										<Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
									</Toast>
								</Col>
							</Row>
						</Container>
					)
				) : (
					<>
						<Container>
							{/* <Col className={s.barraC} xs={12} md={2} lg={2}>
					<Filter></Filter>
					</Col> */}
							<Col className={s.cont_cards} xs={12} md={12} lg={12}>
								<Container className={s.conteiner}>
									<Row className={s.cont_prin_card}>
										{currentPostsSearch.map((p, i) => {
											return (
												<Col sm={6} md={4} lg={3} key={i}>
													<ProductCard id={p.id} name={p.name} description={p.description} img={p.image} price={p.price} stock={p.stock} setShow={setShow} />
												</Col>
											);
										})}
									</Row>
								</Container>
							</Col>
							<Page postsPerPage={postsPerPage} totalPosts={products.length} paginate={paginate} />
						</Container>
						<Row>
							<Col xs={6}>
								<Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
									<Toast.Header>
										<img src='holder.js/20x20?text=%20' className='rounded mr-2' alt='' />
										<strong className='mr-auto'>Bootstrap</strong>
										<small>11 mins ago</small>
									</Toast.Header>
									<Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
								</Toast>
							</Col>
						</Row>
					</>
				)}
			</Col>
		</div>
	);
};
function mapStateToProps(state) {
	return {
		categories: state.categories,
		productsP: state.products,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		getCategoryP: () => dispatch(getCategories()),
		getProductP: () => dispatch(getProducts()),
		getProductByCategoryP: (catN) => dispatch(getProductByCategory(catN)),
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(Catalogo);
