import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const AddCategories = ({ cat, editCategories, handlerProductCat, addProductCategories, setEditCategories }) => {
	return (
		<Modal show={editCategories} onHide={() => setEditCategories(false)} centered={true} backdrop='static'>
			<Modal.Header closeButton>
				<Modal.Title>Choose at least one category</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Group onChange={handlerProductCat}>
					{cat.map((c) => {
						return (
							<div>
								<label htmlFor={c.name}>{c.name}</label>
								<input type='checkbox' name={c.name} value={c.name} onChange={handlerProductCat} />
							</div>
						);
					})}
				</Form.Group>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='success' onClick={() => addProductCategories()}>
					done!
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
export default AddCategories;
