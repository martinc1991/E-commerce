import React from 'react';
import { Table, Button } from 'react-bootstrap';
import s from '../../styles/adminProduct.module.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { getUsers, deleteUser, updateUser, getUserDetail } from '../../store/actions/userActions';
import { Link } from 'react-router-dom';
import { enlacesUser, enlacesUserConAdmin, enlacesUserSinAdmin, enlacesAdmin } from '../../constans/constans';
import Navegacion from '../Navegacion/Navegacion';
import Confirm from '../Modals/Confirm'

const url = 'localhost:3001';

const UsersData = ({ usersP, successP, getUsersP, deleteUserP, updateUserP, getUserDetailP }) => {
	const tipo = 'users'

	// console.log(usersP);
	// console.log(successP);
	/*********************** Local States ************************* */
	// const [users, setUsers] = useState(usersP);
	const [showUser, setShowUser] = useState(false)
	const [userSelected, setUserSelected] = useState({})


	/*********************** Functions **************************** */

	const handleDelete = function (usuario) {
		// var confirmDelete = window.confirm(`Estas a punto de eliminar el usuario:\n${email}\nDeseas continuar?`);
		    setShowUser(true)
			setUserSelected(usuario)
		
	};

	const handleUpdatePassword = function (email, id, role, resetPassword) {
		console.log('Funciona el boton del lapiz PASSWORD');
		var confirmResetPassword = window.confirm(`Estas a punto de resetear la contraseña del usuario:\n${email}\nDeseas continuar?`);
		if (confirmResetPassword) {
			const data = {
				email,
				id,
				role,
				resetPassword,
			};
			console.log(data);
			updateUserP(data);
		}
		// window.location.reload();
	};

	const handleUpdateRole = function (email, id, role, resetPassword) {
		// Siempre le llegan los datos de la tabla, por lo que cada vez que se ejecute esta funcion deberia actualizarse la tabla
		console.log('Funciona el boton del lapiz ROLE');
		console.log(role);
		var newRole;
		if (role == 'client') {
			newRole = 'admin';
		} else {
			newRole = 'client';
		}
		var confirmRoleChange = window.confirm(`Estas a punto de cambiar los permisos del usuario:\n${email}\nDejara de ser ${role} y pasara a ser ${newRole} \nDeseas continuar?`);
		if (confirmRoleChange) {
			const data = {
				email,
				id,
				role: newRole,
				resetPassword,
			};
			console.log(data);
			updateUserP(data);
		}
		// window.location.reload();
	};

	/****************************** Component Life Cycle ********************************** */

	useEffect(() => {
		getUsersP();
	}, []);

	/****************************** Render ********************************** */

	return (
		<div>
			<div>
				<Navegacion linksU={enlacesUserSinAdmin} linksA={enlacesAdmin} showSearchbar={false} />
				<div className={s.table_prin}>
					<Table striped bordered hover size='sm' responsive="lg">
						<thead className={s.tableTitle}>
							<tr>
								<th>ID</th>
								<th>Email</th>
								<th>Resetear Password</th>
								<th>Rol</th>
								<th>Fecha de Creacion</th>
								<th>Ordenes</th>
								<th className={s.tableActions}>Delete</th>
							</tr>
						</thead>

						<tbody>
							{usersP.map((usuario) => {
								return usersP ? (
									<tr className={s.tableDescrip} key={usuario.id}>
										<td>{usuario.id}</td>
										<td>{usuario.email}</td>
										<td>
											{usuario.password}
											<FontAwesomeIcon icon={faPencilAlt} size={'1x'} className={`mx-3 ${s.iconUpdate}`} onClick={() => handleUpdatePassword(usuario.email, usuario.id, usuario.role, true)} />
										</td>
										<td>
											{usuario.role}
											<FontAwesomeIcon icon={faPencilAlt} size={'1x'} className={`mx-3 ${s.iconUpdate}`} onClick={() => handleUpdateRole(usuario.email, usuario.id, usuario.role, false)} />
										</td>
										<td>{usuario.createdAt}</td>
										<td>
											<Button as={Link} className={`my-0 py-0 ${s.orderButton}`} to={`/users/${usuario.id}`} onClick={() => getUserDetailP(usuario.id)}>
												Ordenes
											</Button>
										</td>
										<td className={s.icons}>
											<FontAwesomeIcon icon={faTrashAlt} size={'1x'} className={`mx-3 ${s.iconDelete}`} onClick={() => handleDelete(usuario)} />
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
											<FontAwesomeIcon icon={faPlusCircle} size={'1x'} className={s.iconAdd} />
										</td>
										<td className={s.icons}>
											<FontAwesomeIcon icon={faPencilAlt} size={'1x'} className={s.iconUpdate} />
											<FontAwesomeIcon icon={faTrashAlt} size={'1x'} className={s.iconDelete} />
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
					<Confirm
					tipo={'user'}
					show={showUser}
					setShow={setShowUser}
					deleted={deleteUserP}
					selected={userSelected}
					/>
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
		deleteUserP: (id) => dispatch(deleteUser(id)),
		updateUserP: (data) => dispatch(updateUser(data)),
		getUserDetailP: (id) => dispatch(getUserDetail(id)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersData);
