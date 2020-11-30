import React from 'react';
import { Button, Modal, Row, Col, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import EditReview from '../Modals/EditReview';
import { useState, useEffect } from 'react';
import s from '../../styles/myReviews.module.css';

const MyReviews = ({ 
        show, 
        setShow, 
        product, 
        user, 
        userReviews, 
        getUserReviews, 
        deleteReviewP, 
        closeMyReviews, 
        editReview,
        setEditReview,
        handlerRate, 
        editReviewForm,
        handlerEditReview })=>{

    
	useEffect(() => {
        if (user){
            getUserReviews(product.id, user.id);
        }
    }, []);

    const [showEdit, setShowEdit] = useState(false);
    
    
    const dltReview = async (productId, reviewId) => {
        
        await deleteReviewP(productId, reviewId);
        await getUserReviews(productId, user.id);
        console.log('REVIEWS DE USUARIO LUEGO DE ELIMINAR UNA')
        console.log(userReviews);
        return;
    }

    const updReview = (review) => {

        setEditReview(review);
        setShowEdit(true);
    }
 
    return(
        <>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName={s.cont_print}
                centered
                aria-labelledby="example-custom-modal-styling-title"
            >
            {/* <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
                Custom Modal Styling
            </Modal.Title>
            </Modal.Header> */}
            <Modal.Body className={`show-grid ${s.cont_body}`}>
            <Row className={s.cont}>
                <Col xs={12} md={4} className={s.cont_img}>
                    <div className={s.imagen}>
                        <img src={product.image}></img>
                        <h6>{product.name}</h6>
                    </div>               
                </Col>
                <Col xs={6} md={8} className={s.cont_inf} >
                    <div className={s.info}>
                        <Modal.Header className={s.header} closeButton>
                        <Modal.Title className={s.title}>Mis comentarios</Modal.Title>
                        </Modal.Header>
                        { userReviews.map(review =>{
                            return (
                                <>
                                    <Row className={s.myReviews}>
                                        <Col xs={8} className={s.reviewName}>
                                            <h5>{review.title}</h5>
                                        </Col>
                                        <Col xs={4} className={s.reviewActions}>
                                            <FontAwesomeIcon icon={faPencilAlt} size={'1x'} className={s.iconUpdate} onClick={()=> updReview(review)} />
                                            <FontAwesomeIcon icon={faTrashAlt} size={'1x'} className={s.iconDelete} onClick={()=> dltReview(product.id, review.id)} />
                                        </Col>
                                    </Row>
                                </>
                            )    
                        })}
                        <Modal.Footer>
                            <Button variant="success" onClick={() => closeMyReviews()}>done!</Button>
                        </Modal.Footer>
                    </div>              
                </Col>
            </Row>
            </Modal.Body>
        </Modal>

        <EditReview
            user={user}
            show={showEdit}
            setShow={setShowEdit}
            product={product}
            review={editReview}
            getUserReviews={getUserReviews}
            handlerRate={handlerRate}
            editReviewForm={editReviewForm}
            handlerEditReview={handlerEditReview}
        />
      </>
    )
}
export default MyReviews;