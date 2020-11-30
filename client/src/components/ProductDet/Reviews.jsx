// <------------------------------------ IMPORTS ------------------------------------>
// React
import React from 'react';
import { useState } from 'react';

// Bootstrap
import { Card, Row, Col, ProgressBar } from 'react-bootstrap';

// Iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faThumbsUp, faThumbsDown, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

// CSS
import s from '../../styles/reviews.module.css';

//Componetes
import MyReviews from '../Modals/MyReviews';

// React-Router-Dom
import { useRouteMatch, Route, useHistory } from 'react-router-dom';
// <------------------------------------ IMPORTS ------------------------------------>

export default function Reviews({ 
	product, 
	getProductP, 
	userReviews, 
	getUserReviews, 
	deleteReviewP, 
	userLoggedP,
	editReview,
	setEditReview,
	handlerRate,
	editReviewForm,
	handlerEditReview,
	rating }) {
		const arrayReviews = product.reviews;
		console.log(arrayReviews);
		const history = useHistory();
		// <------------------------------ESTADOS------------------------------>
	
		const [show, setShow] = useState(false);

	// <-----------------------------FUNCIONES----------------------------->
	// Promeio general del producto
	const roundedRate = Math.round(rating * 10)/10;
	const fixedRate = roundedRate.toFixed(1);
	// Opinion general (puede ser 'malo', 'regular', 'bueno', 'muy bueno' o 'excelente')
	const opinionGeneral = function (numEstrellas) {
		var opciones = ['malo', 'regular', 'bueno', 'muy bueno', 'excelente'];
		return opciones[numEstrellas - 1];
	};

	// Devuelve el valor que va dentro del atributo 'now' en cada progress bar
	const nowProgressBar = function (array, estrellas) {
		var nowNumerador = array.filter((review) => review.rate == estrellas);
		return Math.floor((nowNumerador.length / array.length) * 100);
	};

	const handleOpenClose = function () {
		const minusIcon = document.getElementById('minusIcon');
		const plusIcon = document.getElementById('plusIcon');
		const contPrincipal = document.getElementById('contPrincipal');
		minusIcon.classList.toggle('d-none');
		plusIcon.classList.toggle('d-none');
		contPrincipal.classList.toggle('d-none');
		console.log(contPrincipal);
	};
	// <-----------------------------FUNCIONES----------------------------->
	const renderCantEstrellas = function (num) {
		var arrayEstrellas = [];
		for (let i = 0; i < num; i++) {
			arrayEstrellas.push(true);
		}
		for (let i = 0; i < 5 - num; i++) {
			arrayEstrellas.push(false);
		}
		return arrayEstrellas;
	};
	var cantEstrellasPromGeneral = renderCantEstrellas(Math.round(rating).toFixed(1))
	const colorStars = (rate)=>{
		if(!rate){
			var rate = 0;
		}
		if (rate > 2.5) rate*=18;
		else if (rate <= 2.5) rate *= 18.2;
		return rate;
	}
	var startWidth = colorStars(rating)

	const openMyReviews = () => {
		if (!userLoggedP) {
			history.push(`/login`);
		} else {
			getUserReviews(product.id, userLoggedP.id);
			setShow(true);
		}
	};

	const closeMyReviews = () => {
			getUserReviews(product.id, userLoggedP.id);
			getProductP()
			setShow(false);
	};

	// <----------------------------------- RENDER ----------------------------------->
	if (!arrayReviews || arrayReviews.length < 1) {
		return (
			<Card className={`my-5 p-4 ${s.productReviewCard}`}>
				<Row className={`${s.bordeRojo} justify-content-center justify-content-md-start w-100 m-0`}>
					<h3 className={``}>Opiniones sobre el producto</h3>
				</Row>
				<Row className={`${s.bordeRojo} w-100 m-0 my-2`}>
					<p className={`${s.opinionDetalladaComentario} px-1 my-1`}>Aún no hay opiniones de este producto. Sé el primero en opinar!</p>
				</Row>
			</Card>	
			
		);
	} else {
		return (
			<>
			<Card className={` p-4 ${s.productReviewCard}`}>
				<Row className={`${s.bordeRojo} justify-content-end w-100 m-0 mt-n1`}>
					<FontAwesomeIcon icon={faMinus} size={'1x'} id={`minusIcon`} className={`${s.openCloseIcon}`} onClick={handleOpenClose} />
					<FontAwesomeIcon icon={faPlus} size={'1x'} id={`plusIcon`} className={`${s.openCloseIcon} d-none`} onClick={handleOpenClose} />
				</Row>
				<Row className={`${s.productReviewHeader} justify-content-center justify-content-md-start w-100 m-0`}>
						<Col xs={12} md={8}><h3>Opiniones sobre el producto</h3></Col>
						<Col xs={12} md={4}><h6 onClick={openMyReviews}>Gestionar mis comentarios</h6></Col>
				</Row>
				<div className={`${s.contPrincipal}`} id={`contPrincipal`}>
					<hr className={`m-0 p-0`}></hr>
					<Row className={`${s.bordeRojo} row align-items-center py-3 m-0`}>
						<Col xs={12} md={4} lg={3} className={`${s.bordeRojo} ${s.colResumenReviews} p-0 d-flex flex-column justify-content-around`}>
							<Row className={`justify-content-md-end justify-content-center p-0 m-0 mt-0`}>
								{/* Promedio general que tiene el producto */}
								<p className={`${s.productPromedio} ${s.bordeRojo} p-0 m-0`}>{ fixedRate }</p>
							</Row>
							<Row className={`${s.bordeRojo} `}>
								{/* Cantidad de estrellas en promedio que tiene el producto */}
								<div className={s.icon}>
									<div className={s.emptyStars}>
										<FontAwesomeIcon icon={faStar} size={'1x'} />
										<FontAwesomeIcon icon={faStar} size={'1x'} />
										<FontAwesomeIcon icon={faStar} size={'1x'} />
										<FontAwesomeIcon icon={faStar} size={'1x'} />
										<FontAwesomeIcon icon={faStar} size={'1x'} />
									</div>
									<div className={s.fullStarsRate} style={{width: startWidth + 'px'}}>
										<div className={s.fullStars}>
											<FontAwesomeIcon icon={faStar} size={'1x'} />
											<FontAwesomeIcon icon={faStar} size={'1x'} />
											<FontAwesomeIcon icon={faStar} size={'1x'} />
											<FontAwesomeIcon icon={faStar} size={'1x'} />
											<FontAwesomeIcon icon={faStar} size={'1x'} />
										</div>
									</div>
								</div>
							</Row>
							<Row className={`${s.bordeRojo} justify-content-md-end justify-content-center  p-0 mt-1 mx-0`}>
								<p className={`${s.cantOpinionesText} my-0 text-right`}>Promedio entre {arrayReviews.length} opiniones</p>
							</Row>
						</Col>
						<Col xs={12} md={8} className={`${s.bordeRojo} ${s.colResumenReviews} d-flex flex-column justify-content-around`}>
							{/* Barras contadoras de progreso de cada cantidad de estrellas */}
							{/* Uso el mismo array que para la cantidad de estrellas porque solo necesito un array con 5 elementos, no hay otro motivo */}
							{cantEstrellasPromGeneral.map((elem, i) => {
								console.log(elem, 5 - i);
								return (
									<Row className={`${s.bordeRojo} p-0 m-0 mt-2 align-items-center justify-content-md-start justify-content-center`}>
										<Col xs={`auto`} className={`p-0 m-0 text-right`}>
											<p className={`${s.bordeRojo} ${s.progressBarText} p-0 m-0`}>{5 - i} estrellas</p>
										</Col>
										<Col xs={6}>
											<ProgressBar className={`${s.progressBar}`} variant='info' now={nowProgressBar(arrayReviews, 5 - i)} />
										</Col>
										<Col xs={`auto`} className={`p-0 m-0 text-left`}>
											<p className={`${s.bordeRojo} ${s.progressBarText} p-0 m-0`}>{arrayReviews.filter((review) => review.rate == 5 - i).length}</p>
										</Col>
									</Row>
								);
							})}
						</Col>
					</Row>
					<hr className={`m-0 mb-4 p-0`}></hr>
					<Row className={`${s.bordeRojo} my-2 mx-0`}>
						{/* <------------------ .map de cada comentario ------------------> */}
						{arrayReviews.map((review, i, arr) => {
							console.log('*****************************');
							console.log(arrayReviews);
							return (
								<div className={`${s.reviewInfo} px-3`}>
									<Row className={`${s.bordeRojo}`}>
										{renderCantEstrellas(review.rate).map((elem) => {
											if (elem) return <FontAwesomeIcon icon={faStar} size={'1x'} className={`${s.estrellaColor}`} />;
											if (!elem) return <FontAwesomeIcon icon={faStar} size={'1x'} className={`${s.estrellaInactiva}`} />;
										})}
									</Row>
									<Row>
										<h6 className={`${s.opinionGeneralComentario} p-1 mt-1 mb-0`}>Opinion general: {opinionGeneral(review.rate)}</h6>
									</Row>
									<Row>
										<h5 className={`${s.opinionGeneralComentario} p-1 mt-1 mb-0`}>{review.title}</h5>
									</Row>
									<Row className={``}>
										<p className={`${s.opinionDetalladaComentario} px-1 my-1`}>{review.content}</p>
									</Row>
									<Row className={s.likesReview}>
										<Col className={`${s.bordeRojo} pb-1 px-0 ml-3`} xs={`auto`}>
											<FontAwesomeIcon icon={faThumbsUp} size={'1x'} className={`${s.iconLikes}`} />
										</Col>
										<Col className={`${s.bordeRojo} p-0 m-0`} xs={`auto`}>
											<p className={`${s.cantLikes}`}>15</p>
										</Col>
										<Col className={`${s.bordeRojo} pt-1 px-0 ml-3`} xs={`auto`}>
											<FontAwesomeIcon icon={faThumbsDown} size={'1x'} className={`${s.iconLikes}`} />
										</Col>
										<Col className={`${s.bordeRojo} p-0 m-0`} xs={`auto`}>
											<p className={`${s.cantLikes}`}>7</p>
										</Col>
									</Row>
									<hr className={arr[i + 1] ? `m-0 mb-3 p-0` : `m-0 mb-3 p-0 d-none`}></hr>
								</div>
							);
						})}
					</Row>
				</div>
			</Card>
			<MyReviews 
				show={show} 
				setShow={setShow} 
				product={product} 
				user={userLoggedP} 
				userReviews={userReviews} 
				getUserReviews={getUserReviews}
				deleteReviewP={deleteReviewP}
				closeMyReviews={closeMyReviews}
				editReview={editReview}
				setEditReview={setEditReview}
				handlerRate={handlerRate}
				editReviewForm={editReviewForm}
				handlerEditReview={handlerEditReview}
			/>
		</>
		);
	}
}
