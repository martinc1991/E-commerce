// React
import { faStar } from '@fortawesome/free-solid-svg-icons';
// Iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
// Bootstrap
import { Button, Col, Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
// React-Router-Dom
import { useHistory, useRouteMatch } from 'react-router-dom';
import { addToCart } from '../../store/actions/cart_actions';
import { getProducts } from '../../store/actions/product_actions';
import { addReview, deleteUserReview, editUserReview, getUserReviews } from '../../store/actions/review_actions';
// CSS
import s from '../../styles/ProductDet.module.css';
import Footer from '../Footer/Footer';
import AddReview from '../Modals/AddReview';
import AvisoLoggin from '../Modals/AvisoLoggin';
import Reviews from './Reviews';

// const url = 'localhost:3001';

// <---------------------------Componente--------------------------->
const Product = ({ productsP, userReviewsP, getProductP, addToCartP, addReviewP, userLoggedP, getUserReviewsP, editUserReviewP, deleteReviewP }) => {
	const [qty, setQty] = useState(1);
	const [show, setShow] = useState(false);
	const [showLoggin, setShowLoggin] = useState(false);
	const [editReview, setEditReview] = useState({});
	const [review, setReview] = useState({});
	const match = useRouteMatch();
	const history = useHistory();
	const { id } = match.params;
	let objP = {};
	var objProduct = productsP.find((d) => {
		return d.id === id;
	});

	// console.log(objProduct);
	for (let pr in objProduct) {
		var prop = pr;
		objP[prop] = objProduct[pr];
	}

	// console.log(objP);

	const getRate = (reviews) => {
		let rate = 0;
		if (reviews.length > 0) {
			reviews.forEach((review) => {
				rate += review.rate;
			});
			rate /= reviews.length;
		}
		return rate;
	};
	if (objP.reviews) var rate = getRate(objP.reviews);

	const colorStars = (rate) => {
		if (!rate) {
			var rate = 0;
		}
		if (rate > 2.5) rate *= 27;
		else if (rate <= 2.5) rate *= 27.2;
		return rate;
	};
	var startWidth = colorStars(rate);
	const roundedRate = Math.round(rate * 10) / 10;
	const fixedRate = roundedRate.toFixed(1);

	const handlerAddToCart = (id, qty, idUser) => {
		addToCartP(id, qty, idUser);
		history.push(`/users/cart`);
	};
	const handlerReview = () => {
		if (!userLoggedP) {
			// history.push(`/login`);
			setShowLoggin(true);
		} else {
			setShow(true);
		}
	};

	const handlerAddReview = (review, productId) => {
		let newReview = {
			...review,
			userId: userLoggedP.id,
		};
		// console.log(newReview);
		// console.log(productId);
		addReviewP(newReview, productId);
		setShow(false);
		setReview({});
	};

	const handlerRate = (e) => {
		if (e.target.checked) {
			setReview({
				...review,
				rate: parseInt(e.target.value),
			});
		}
	};

	const reviewForm = (e) => {
		let newReview = {
			...review,
			[e.target.name]: e.target.value,
		};
		setReview(newReview);
	};

	const handlerEditRate = (e) => {
		if (e.target.checked) {
			setEditReview({
				...editReview,
				rate: parseInt(e.target.value),
			});
		}
		// console.log('SOY EL NUEVO RATE EDITADO');
		// console.log(editReview);
	};

	const editReviewForm = (e) => {
		let newReview = {
			...editReview,
			[e.target.name]: e.target.value,
		};
		setEditReview(newReview);
		// console.log('SOY EL ESTADO CAMBIADO DE LA EDIT REVIEW');
		// console.log(editReview);
	};

	const handlerEditReview = (productId, editReview) => {
		editUserReviewP(productId, editReview);
		getUserReviewsP(objP.id, userLoggedP.id);
		setEditReview({});
	};

	// console.log(objP.reviews);
	useEffect(() => {
		getProductP();
	}, []);

	return (
		<div>
			<Container className={s.container}>
				<div className={s.cont_prin}>
					<Row>
						<Col xs={12} md={12} lg={8} className={s.cont_img}>
							<img src={objP.image}></img>
						</Col>
						<Col xs={12} md={12} lg={4} className={s.cont_info}>
							<div className={s.infog}>
								<h3>{`${objP.name}` || `Product Name Here`}</h3>
								<h4>$ {`${objP.price}` || `00000`}</h4>
								<h6>Referencia: {`${objP.sku}` || `codReferencia`}</h6>
								<div className={s.contReviw}>
									<div className={s.icon}>
										<div className={s.emptyStarsCont}>
											<div className={s.emptyStars}>
												<FontAwesomeIcon icon={faStar} />
												<FontAwesomeIcon icon={faStar} />
												<FontAwesomeIcon icon={faStar} />
												<FontAwesomeIcon icon={faStar} />
												<FontAwesomeIcon icon={faStar} />
											</div>
										</div>
										<div className={s.fullStarsRate} style={{ width: startWidth + 'px' }}>
											<div className={s.fullStars}>
												<FontAwesomeIcon icon={faStar} />
												<FontAwesomeIcon icon={faStar} />
												<FontAwesomeIcon icon={faStar} />
												<FontAwesomeIcon icon={faStar} />
												<FontAwesomeIcon icon={faStar} />
											</div>
										</div>
									</div>
									<div className={s.addReview}>
										<p onClick={() => handlerReview()}>Escribir comentario</p>
									</div>
								</div>
								<h5>
									{fixedRate}/ 5.0 ({objP.reviews && objP.reviews.length} opiniones)
								</h5>
								<p>{`${objP.description}` || `Descripcion no disponible`}</p>
								<p>
									<span className={s.dim}>Dimensiones:</span> {`${objP.dimentions}` || `noDisponible`}
								</p>
								<div className={s.cont_cant}>
									{objP.stock > 0 ? (
										<div className={s.cont_cant2}>
											<label for='Cantidad'>Candidad:</label>
											<select
												name='Cantidad'
												id='Cantidad'
												className={s.select}
												value={qty}
												onChange={(e) => {
													setQty(e.target.value);
												}}
											>
												{[...Array(objP.stock).keys()].map((x) => {
													return <option value={x + 1}>{x + 1}</option>;
												})}
											</select>
											<h6> {objP.stock} Unidades Disponibles</h6>
										</div>
									) : (
										<h4 className={s.agotadoProct}> Producto Agotado</h4>
									)}
								</div>
								{objP.stock > 0 && (
									<div className={s.cont_button}>
										<Button className={s.buttonCom}>Comprar ahora</Button>
										<Button className={s.buttonCar} onClick={() => handlerAddToCart(objP.id, qty, userLoggedP && userLoggedP.id)}>
											Agregar al carrito
										</Button>
									</div>
								)}
							</div>
						</Col>
					</Row>
				</div>
				<AddReview show={show} setShow={setShow} product={objP} handlerAddReview={handlerAddReview} reviewForm={reviewForm} review={review} handlerRate={handlerRate} />
				<AvisoLoggin showLoggin={showLoggin} setShowLoggin={setShowLoggin} />
				<Reviews product={objP} getProductP={getProductP} userReviews={userReviewsP} getUserReviews={getUserReviewsP} deleteReviewP={deleteReviewP} userLoggedP={userLoggedP} editReview={editReview} setEditReview={setEditReview} handlerRate={handlerEditRate} editReviewForm={editReviewForm} handlerEditReview={handlerEditReview} rating={rate} />
			</Container>
			<Footer />
		</div>
	);
};

function mapStateToProps(state) {
	return {
		productsP: state.products,
		userLoggedP: state.userLogged,
		userReviewsP: state.userReviews,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		getProductP: () => dispatch(getProducts()),
		addToCartP: (id, qty, idUser) => dispatch(addToCart(id, qty, idUser)),
		addReviewP: (review, productId) => dispatch(addReview(review, productId)),
		getUserReviewsP: (productId, userId) => dispatch(getUserReviews(productId, userId)),
		editUserReviewP: (productId, review) => dispatch(editUserReview(productId, review)),
		deleteReviewP: (productId, reviewId) => dispatch(deleteUserReview(productId, reviewId)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
