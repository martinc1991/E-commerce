import React from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import s from '../../styles/addReview.module.css';
import Review from '../Review/review';

const AddReview = ({ show, setShow, product, reviewForm, handlerAddReview, review, handlerRate }) => {
	return (
		<Modal show={show} onHide={() => setShow(false)} dialogClassName={s.cont_print} aria-labelledby='example-custom-modal-styling-title'>
			<Modal.Body className={`show-grid ${s.cont_body}`}>
				<Row className={s.cont}>
					<Col xs={12} md={12} lg={4} className={s.cont_img}>
						<div className={s.imagen}>
							<img src={product.image}></img>
							<h6>{product.name}</h6>
						</div>
					</Col>
					<Col xs={12} md={12} lg={8} className={s.cont_inf}>
						<div className={s.info}>
							<Modal.Header className={s.header} closeButton>
								<Modal.Title className={s.title}>Tu opinión es importante!</Modal.Title>
							</Modal.Header>
							<Form>
								<div className={s.title2}>
									<h6>Calificación general</h6>
									<div className={s.strat}>
										<Review handlerRate={handlerRate} />
									</div>
								</div>
								<Form.Group>
									<Form.Label className={s.title2}>Titulo</Form.Label>
									<Form.Control name='title' className={s.input} size='sm' type='text' placeholder='Ejemplo: ¡Es muy liviano!' onChange={reviewForm} />
								</Form.Group>
								<Form.Group controlId='exampleForm.ControlTextarea1'>
									<Form.Label className={s.title2}>Escriba su comentario</Form.Label>
									<Form.Control name='content' className={s.input} as='textarea' rows={3} onChange={reviewForm} />
								</Form.Group>
							</Form>
							{/* <div className={s.recordar}>
                        <p>¿Recomendarias este producto a otra persona?</p>                
                        <Button className={s.button}>SI</Button>
                        <Button className={s.button}>NO</Button>                       
                    </div> */}
							<div className={s.addCom}>
								<Button className={s.button2} onClick={() => handlerAddReview(review, product.id)}>
									Agregar comentario
								</Button>
							</div>
						</div>
					</Col>
				</Row>
			</Modal.Body>
		</Modal>
	);
};
export default AddReview;
