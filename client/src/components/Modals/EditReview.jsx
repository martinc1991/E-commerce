import React from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import s from '../../styles/editReview.module.css';
import Review from '../Review/review';

const EditReview = ({ user, show, setShow, product, review, getUserReviews, handlerRate, editReviewForm, handlerEditReview }) => {
	// console.log('SOY LA REVIEW QUE SE VA A ACTUALIZAR');
	// console.log(review);
	// console.log(user);

	const handlerUpdReview = async (productId, review) => {
		handlerEditReview(productId, review);
		await getUserReviews(productId, user.id);
		setShow(false);
	};

	return (
		<Modal show={show} onHide={() => setShow(false)} dialogClassName={s.cont_print}>
			<Modal.Body className={`show-grid ${s.cont_body}`}>
				<Row className={s.cont}>
					<Col xs={12} md={4} className={s.cont_img}>
						<div className={s.imagen}>
							<img src={product.image}></img>
							<h6>{product.name}</h6>
						</div>
					</Col>
					<Col xs={6} md={8} className={s.cont_inf}>
						<div className={s.info}>
							<Modal.Header className={s.header} closeButton>
								<Modal.Title className={s.title}>Quieres cambiar de opinión?</Modal.Title>
							</Modal.Header>
							<Form>
								<div className={s.title2}>
									<h6>Calificación general</h6>
									<div className={s.strat}>
										<Review handlerRate={handlerRate} review={review} />
									</div>
								</div>
								<Form.Group>
									<Form.Label className={s.title2}>Titulo</Form.Label>
									<Form.Control name='title' className={s.input} size='sm' type='text' value={review.title} onChange={editReviewForm} />
								</Form.Group>
								<Form.Group controlId='exampleForm.ControlTextarea1'>
									<Form.Label className={s.title2}>Escriba su comentario</Form.Label>
									<Form.Control name='content' className={s.input} as='textarea' rows={3} value={review.content} onChange={editReviewForm} />
								</Form.Group>
							</Form>
							<div className={s.addCom}>
								<Button className={s.button2} onClick={() => handlerUpdReview(product.id, review)}>
									Publicar comentario!
								</Button>
							</div>
						</div>
					</Col>
				</Row>
			</Modal.Body>
		</Modal>
	);
};
export default EditReview;
