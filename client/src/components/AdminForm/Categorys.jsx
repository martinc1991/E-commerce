import React, { useState } from 'react';
import { Table, Button, Container, Modal, FormGroup, Form } from 'react-bootstrap';
import datas from './Data';
import s from '../styles/styles.module.css';
import Menu from './menu';

const Categorys = () => {
	const [date, setData] = useState(datas.dataCat);
	const [form, setForm] = useState({
		name: '',
		description: '',
	});
	const [show, setShow] = useState(false);
	const [showUpdate, setShowUpdate] = useState(false);

	/*********************** Functions **************************** */
	const openModal = () => {
		setShow(true);
	};
	const openModalUpdate = () => {
		setShowUpdate(true);
	};
	const closeModal = () => {
		setShow(false);
	};
	const closeModalUpdate = () => {
		setShowUpdate(false);
	};
	const handlerChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};
	const insertProduct = () => {
		console.log(form);
		let dataNew = date;
		dataNew.push({ ...form });
		console.log(dataNew);
		setData(dataNew);
		setShow(false);
	};
	const updateProductModal = (product) => {
		console.log(product);
		let cont = 0;
		let list = date;
		list.map((dat) => {
			if (dat.id === product.id) {
				list[cont].name = product.name;
				list[cont].description = product.description;
				list[cont].price = product.price;
				list[cont].stock = product.stock;
				list[cont].category = product.category;
			}
			cont++;
		});
		setShowUpdate(true);
		setForm(product);
		setData(list);
	};

	const updateProduct = (dat) => {
		console.log(dat);
		let cont = 0;
		let list = date;
		list.map((date) => {
			if (date.id === dat.id) {
				list[cont].name = dat.name;
				list[cont].description = dat.description;
				list[cont].price = dat.price;
				list[cont].stock = dat.stock;
				list[cont].category = dat.category;
			}
			cont++;
		});

		setData(list);
		setShowUpdate(false);
	};

	const deleteProduct = (id) => {
		if (window.confirm('Are you sure remove this product?')) {
			let list = date.filter((dt) => {
				return dt.id !== id;
			});
			return setData(list);
		}
	};

	return (
		<>
			{/* <Menu/> */}
			<div className={s.cont__Form__Admin__Pr}>
				{/* <Menu/> */}
				<div className={s.cont__table__pr}>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Name</th>
								<th>Description</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{date.map((dat) => {
								return (
									<tr>
										<td>{dat.name}</td>
										<td>{dat.description}</td>
										<td>
											<Button variant='danger' onClick={() => deleteProduct(dat.id)}>
												Delete
											</Button>
											{'  '}
											<Button variant='primary' onClick={() => updateProductModal(dat)}>
												Update
											</Button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
					<Button variant='success' onClick={openModal}>
						Add Category
					</Button>
				</div>
			</div>
			{/**************************** MODAL ADD ******************************** */}
			<div>
				<Modal show={show} backdrop='static' onHide={closeModal} keyboard={false}>
					<Modal.Header>Add Product</Modal.Header>

					<Modal.Body>
						<Form.Group>
							<Form.Label>Id:</Form.Label>
							<input type='text' name='name' value={date.length + 1} readOnly />
						</Form.Group>
						<Form.Group>
							<Form.Label>Name:</Form.Label>
							<input type='text' name='name' onChange={handlerChange} />
						</Form.Group>
						<Form.Group>
							<Form.Label>Description:</Form.Label>
							<input type='text' name='description' onChange={handlerChange} />
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant='success' onClick={insertProduct}>
							Add
						</Button>
						<Button variant='danger' onClick={closeModal}>
							Cancel
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
			<div>
				<Modal show={showUpdate} backdrop='static' onHide={closeModalUpdate} keyboard={false}>
					<Modal.Header>Update Category</Modal.Header>

					<Modal.Body>
						<Form.Group>
							<Form.Label>Id:</Form.Label>
							<input type='text' name='name' readOnly value={date.length + 1} />
						</Form.Group>
						<Form.Group>
							<Form.Label>Name:</Form.Label>
							<input type='text' name='name' onChange={handlerChange} value={form.name} />
						</Form.Group>
						<Form.Group>
							<Form.Label>Description:</Form.Label>
							<input type='text' name='description' onChange={handlerChange} value={form.description} />
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant='success' onClick={() => updateProduct(form)}>
							Update
						</Button>
						<Button variant='danger' onClick={closeModalUpdate}>
							Cancel
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</>
	);
};

export default Categorys;
