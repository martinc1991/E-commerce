import React from 'react';
import s from '../../styles/adminProduct.module.css';
import {Button, Modal, Form, Container } from 'react-bootstrap';

const AddProduct = ({data, show, closeModal, handlerChange, insertProduct, setShowCategories, productCat}) => {

    console.log(productCat)

    return (
        <Modal show={show} backdrop="static" onHide={closeModal} keyboard={false}>
            
            <Modal.Header closeButton className={s.title}>Add Product</Modal.Header>
            <Modal.Body className={s.cont}>
            <Form.Group>
                <Form.Label className={s.titles} >Id:</Form.Label>
                    <input className={s.inputs} type="text" name="name" value={data.length+1} readOnly/>
                </Form.Group>
                <Form.Group>
                    <Form.Label className={s.titles}>Name:</Form.Label>
                    <input className={s.inputs} type="text" name="name"  onChange={handlerChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label className={s.titles}>Description:</Form.Label>
                    <input className={s.inputs} type="text" name="description" onChange={handlerChange}/>
                    {/* <textarea className={s.inputs} name="description" onChange={handlerChange}></textarea> */}
                </Form.Group>
                <Form.Group>
                    <Form.Label className={s.titles}>Price:</Form.Label>
                    <input className={s.inputs} type="number" name="price" onChange={handlerChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label className={s.titles}>Stock:</Form.Label>
                    <input className={s.inputs} type="number" name="stock" onChange={handlerChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label className={s.titles}>Image:</Form.Label>
                    <input className={s.inputs} type="text" name="image" onChange={handlerChange} placeholder='http://www.image.com'/>
                </Form.Group>
                <Form.Group>
                    <Form.Label className={s.titles}>Dimention:</Form.Label>
                    <input className={s.inputs} type="text" name="dimentions" onChange={handlerChange} />
                </Form.Group>
                <Form.Group>
                    <Button variant="success" onClick={() => setShowCategories(true)}>Add Categories</Button>
                </Form.Group>
                <Container>
                    <ul className={s.ulList}>
                        {productCat.map((p, index)=>{
                            return (
                                <li className={s.liList} key={index}>{p}</li>
                            )
                        })}
                    </ul>
                </Container>
            </Modal.Body>
            <Modal.Footer className={s.buttons} >
                <Button className={s.buttonAdd} onClick={insertProduct}>Add</Button>
                <Button  className={s.buttonCancel} onClick={closeModal}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default AddProduct; 