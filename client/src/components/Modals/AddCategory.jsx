import React from 'react';
import s from '../../styles/adminCategories.module.css';
import { Button, Modal, Form } from 'react-bootstrap';

const AddCategory = ({ data, show, closeModal, handlerChange, insertCategory, form }) => {
	return (
		<Modal show={show} backdrop='static' onHide={closeModal} keyboard={false}>
			<Modal.Header closeButton className={s.title}>
				{' '}
				Add Category{' '}
			</Modal.Header>
			<Modal.Body className={s.cont}>
				<Form.Group>
					<Form.Label className={s.titles}>Name:</Form.Label>
					<input className={s.inputs} type='text' name='name' onChange={handlerChange} />
				</Form.Group>
				<Form.Group>
					<Form.Label className={s.titles}>Description:</Form.Label>
					<input className={s.inputs} type='text' name='description' onChange={handlerChange} />
				</Form.Group>
			</Modal.Body>
			<Modal.Footer className={s.buttons}>
				<Button className={s.buttonAdd} onClick={insertCategory}>
					Add
				</Button>
				<Button className={s.buttonCancel} onClick={closeModal}>
					Cancel
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
export default AddCategory;
