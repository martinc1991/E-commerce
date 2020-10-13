import React from 'react';
import s from '../../styles/adminCategories.module.css';
import {Button, Modal, Form } from 'react-bootstrap';

const UpdateCategory = ({form, showUpdate, closeModalUpdate, handlerChange, updateCategory}) => {

    return (
        <Modal show={showUpdate} backdrop="static" onHide={closeModalUpdate} keyboard={false}>
            
            <Modal.Header closeButton className={s.title}>Update Category</Modal.Header>
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
            </Modal.Body>
            <Modal.Footer className={s.buttons}>
                <Button className={s.buttonAdd} onClick={() => updateCategory(form)}>Update</Button>
                <Button className={s.buttonCancel} onClick={closeModalUpdate}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default UpdateCategory; 