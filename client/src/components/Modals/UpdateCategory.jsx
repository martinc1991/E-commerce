import React from 'react';
import {Button, Modal, Form } from 'react-bootstrap';

const UpdateCategory = ({form, showUpdate, closeModalUpdate, handlerChange, updateCategory}) => {

    return (
        <Modal show={showUpdate} backdrop="static" onHide={closeModalUpdate} keyboard={false}>
            
            <Modal.Header>Update Category</Modal.Header>
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
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={() => updateCategory(form)}>Update</Button>
                <Button variant="danger" onClick={closeModalUpdate}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default UpdateCategory; 