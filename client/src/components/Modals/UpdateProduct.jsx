import React from 'react';
import s from '../../styles/adminProduct.module.css';
import {Button, Modal, Form } from 'react-bootstrap';

const UpdateProduct = ({form, showUpdate, closeModalUpdate, handlerChange, updateProduct, setShowCategories}) => {

    return (
        <Modal show={showUpdate} backdrop="static" onHide={closeModalUpdate} keyboard={false}>
                
                <Modal.Header closeButton className={s.title}>Update Product</Modal.Header>
                <Modal.Body className={s.cont}>
                <Form.Group>
                    <Form.Label className={s.titles}>Id:</Form.Label>
                    <input className={s.inputs} type="text" name="name"  readOnly value={form.id} />
                </Form.Group>
                <Form.Group>
                    <Form.Label className={s.titles}>Name:</Form.Label>
                    <input className={s.inputs} type="text" name="name"  onChange={handlerChange} value={form.name}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label className={s.titles}>Description:</Form.Label>
                    <input className={s.inputs} type="text" name="description" onChange={handlerChange} value={form.description}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label className={s.titles}>Price:</Form.Label>
                    <input className={s.inputs} type="number" name="price" onChange={handlerChange} value={form.price}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label className={s.titles}>Stock:</Form.Label>
                    <input className={s.inputs} type="number" name="stock" onChange={handlerChange} value={form.stock}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label className={s.titles}>Image:</Form.Label>
                    <input className={s.inputs} type="text" name="image" onChange={handlerChange} placeholder='http://www.image.com' value={form.image}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label className={s.titles}>Dimention:</Form.Label>
                    <input className={s.inputs} type="text" name="dimention" onChange={handlerChange}  value={form.dimentions}/>
                </Form.Group>
                    <Form.Group>
                        <Button variant="success" onClick={() => setShowCategories(true)}>Edit Categories</Button>
                    </Form.Group>
                </Modal.Body>
            <Modal.Footer className={s.buttons}>
                <Button className={s.buttonAdd} onClick={() => updateProduct(form)}>Update</Button>
                <Button className={s.buttonCancel} onClick={closeModalUpdate}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default UpdateProduct; 