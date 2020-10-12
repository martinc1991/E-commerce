import React from 'react';
import {Button, Modal, Form } from 'react-bootstrap';

const UpdateProduct = ({form, showUpdate, closeModalUpdate, handlerChange, updateProduct, setShowCategories}) => {

    return (
        <Modal show={showUpdate} backdrop="static" onHide={closeModalUpdate} keyboard={false}>
                
                <Modal.Header>Update Product</Modal.Header>
                <Modal.Body>
                <Form.Group>
                        <Form.Label>Id:</Form.Label>
                        <input type="text" name="name"  readOnly value={form.id} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Name:</Form.Label>
                        <input type="text" name="name"  onChange={handlerChange} value={form.name}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description:</Form.Label>
                        <input type="text" name="description" onChange={handlerChange} value={form.description}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price:</Form.Label>
                        <input type="number" name="price" onChange={handlerChange} value={form.price}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Stock:</Form.Label>
                        <input type="number" name="stock" onChange={handlerChange} value={form.stock}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Image:</Form.Label>
                        <input type="text" name="image" onChange={handlerChange} placeholder='http://www.image.com' value={form.image}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Dimention:</Form.Label>
                        <input type="text" name="dimention" onChange={handlerChange}  value={form.dimentions}/>
                    </Form.Group>
                    <Form.Group>
                        <Button variant="success" onClick={() => setShowCategories(true)}>Edit Categories</Button>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => updateProduct(form)}>Update</Button>
                    <Button variant="danger" onClick={closeModalUpdate}>Cancel</Button>
                </Modal.Footer>
        </Modal>
    )
}
export default UpdateProduct; 