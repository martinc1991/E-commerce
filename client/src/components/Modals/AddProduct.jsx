import React from 'react';
import {Button, Modal, Form } from 'react-bootstrap';

const AddProduct = ({data, show, closeModal, handlerChange, insertProduct, setShowCategories}) => {

    return (
        <Modal show={show} backdrop="static" onHide={closeModal} keyboard={false}>
            
            <Modal.Header>Add Product</Modal.Header>
            <Modal.Body>
            <Form.Group>
                    <Form.Label>Id:</Form.Label>
                    <input type="text" name="name" value={data.length+1} readOnly/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Name:</Form.Label>
                    <input type="text" name="name"  onChange={handlerChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description:</Form.Label>
                    <input type="text" name="description" onChange={handlerChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Price:</Form.Label>
                    <input type="number" name="price" onChange={handlerChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Stock:</Form.Label>
                    <input type="number" name="stock" onChange={handlerChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Image:</Form.Label>
                    <input type="text" name="image" onChange={handlerChange} placeholder='http://www.image.com'/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Dimention:</Form.Label>
                    <input type="text" name="dimentions" onChange={handlerChange} />
                </Form.Group>
                <Form.Group>
                    <Button variant="success" onClick={() => setShowCategories(true)}>Add Categories</Button>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={insertProduct} id="btn_Validar">Add</Button>
                <Button variant="danger" onClick={closeModal}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default AddProduct; 