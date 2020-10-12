import React from 'react';
import {Button, Modal, Form } from 'react-bootstrap';

const AddCategory = ({data, show, closeModal, handlerChange, insertCategory}) => {

    return (
        <Modal show={show} backdrop="static" onHide={closeModal} keyboard={false}>

            <Modal.Header> Add Category </Modal.Header>
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
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={insertCategory}>Add</Button>
                <Button variant="danger" onClick={closeModal}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default AddCategory; 