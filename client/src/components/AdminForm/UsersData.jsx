import React from 'react';
import { Table, Button } from 'react-bootstrap';
// import AddProduct from '../Modals/AddProduct';
// import AddCategories from '../Modals/AddCategories';
// import AddProductCategories from '../Modals/AddProductCategories';
// import UpdateProduct from '../Modals/UpdateProduct';
import s from '../../styles/adminProduct.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { getUsers } from '../../store/actions/userActions';

const url = 'localhost:3001';

const UsersData = ({ usersP, successP, getUsersP }) => {
	console.log(usersP);
	console.log(successP);
	/*********************** Local States ************************* */
	// const [usersP, setUsers] = useState(usersP);
	var usuariosDesdeBD = [];
	/*********************** Functions **************************** */
	const getUsersFromDB = async () => {
		getUsersP();
	};

	console.log(usuariosDesdeBD);
	/****************************** Component Life Cycle ********************************** */

	useEffect(() => {
		getUsersP();
	}, []);

	/****************************** Render ********************************** */

	return (
		<div>
			<div>
				{/* <Menu/> */}
				<div className={s.table_prin}>
					<Table striped bordered hover size='sm'>
						<thead className={s.tableTitle}>
							<tr>
								<th>ID</th>
								<th>Email</th>
								<th>Password</th>
								<th>Rol</th>
								<th>Fecha de Creacion</th>
								<th className={s.tableActions}>Action</th>
							</tr>
						</thead>

						<tbody>
							{usersP.map((usuario) => {
								console.log('un usuario');
								return usersP ? (
									<tr className={s.tableDescrip} key={usuario.id}>
										<td>{usuario.id}</td>
										<td>{usuario.email}</td>
										<td>{usuario.password}</td>
										<td>{usuario.role}</td>
										<td>{usuario.createdAt}</td>
										<td className={s.icons}>
											<FontAwesomeIcon
												icon={faPencilAlt}
												size={'1x'}
												className={s.iconUpdate}
												// onClick={() => updateProductModal(dat)}
											/>
											<FontAwesomeIcon
												icon={faTrashAlt}
												size={'1x'}
												className={s.iconDelete}
												// onClick={() => deleteProduct(dat.id)}
											/>
											{/* <Button className={s.buttonDelete} onClick={() => deleteProduct(dat.id)}>Delete</Button>{"  "}
                                        <Button className={s.buttonUp} onClick={()=> updateProductModal(dat)}>Update</Button> */}
										</td>
									</tr>
								) : (
									<tr className={s.tableDescrip} key={usuario.id}>
										<td>No hay datos</td>
										<td>No hay datos</td>
										<td>No hay datos</td>
										<td>No hay datos</td>
										<td>No hay datos</td>
										<td>
											<FontAwesomeIcon
												icon={faPlusCircle}
												size={'1x'}
												className={s.iconAdd}
												// onClick={() => {
												// 	setEditCategories(true);
												// 	setDataObject(dat);
												// }}
											/>
										</td>
										<td className={s.icons}>
											<FontAwesomeIcon
												icon={faPencilAlt}
												size={'1x'}
												className={s.iconUpdate}
												// onClick={() => updateProductModal(dat)}
											/>
											<FontAwesomeIcon
												icon={faTrashAlt}
												size={'1x'}
												className={s.iconDelete}
												// onClick={() => deleteProduct(dat.id)}
											/>
											{/* <Button className={s.buttonDelete} onClick={() => deleteProduct(dat.id)}>Delete</Button>{"  "}
                                        <Button className={s.buttonUp} onClick={()=> updateProductModal(dat)}>Update</Button> */}
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
					<Button
						className={s.buttonADD}
						// onClick={openModal}
					>
						Add Product
					</Button>
				</div>
			</div>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		usersP: state.users,
		successP: state.createUserSuccess,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getUsersP: () => dispatch(getUsers()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersData);
