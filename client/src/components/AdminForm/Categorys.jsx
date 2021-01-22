import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { enlacesAdmin, enlacesUserSinAdmin } from '../../constants/constants';
import { AddCategorie, deleteCategory, getCategories, updCategory } from '../../store/actions/category_actions';
import s from '../../styles/adminCategories.module.css';
import AddCategory from '../Modals/AddCategory';
import Confirm from '../Modals/Confirm';
import UpdateCategory from '../Modals/UpdateCategory';
import Navegacion from '../Navegacion/Navegacion';

const Categorys = ({ categories, getCategoryP, addCategoryP, updCategoryP, deleteCategoryP }) => {
	/*********************** Local States ************************* */
	const [data, setData] = useState([]);
	const [form, setForm] = useState({ name: '', description: '' });
	const [show, setShow] = useState(false);
	const [showUpdate, setShowUpdate] = useState(false);
	const [showCat, setShowCat] = useState(false);
	const [catSelected, setCatSelected] = useState({});
	/*********************** Functions **************************** */
	const openModal = () => {
		setShow(true);
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

	const insertCategory = () => {
		addCategoryP(form);
		setShow(false);
		return;
	};

	const updateCategoryModal = (category) => {
		let list = data;
		list.map((dat, index) => {
			if (dat.id === category.id) {
				list[index].name = category.name;
				list[index].description = category.description;
			}
		});
		setShowUpdate(true);
		setForm(category);
		setData(list);
	};

	const updateCategory = (dat) => {
		// console.log(dat);
		updCategoryP(dat);
		setShowUpdate(false);
		return;
	};
	const handleDelete = function (cat) {
		setShowCat(true);
		setCatSelected(cat);
	};
	/*********************** Component Life Cycle *************************** */
	useEffect(() => {
		getCategoryP();
	}, []);
	/****************************** Render ********************************** */
	return (
		<div>
			<Navegacion linksU={enlacesUserSinAdmin} linksA={enlacesAdmin} showSearchbar={false} />
			{/* <Menu/> */}
			<div className={s.table_prin}>
				{/* <Menu/> */}
				<div>
					<Table striped bordered hover size='sm' responsive='md'>
						<thead className={s.tableTitle}>
							<tr>
								<th>Name</th>
								<th>Description</th>
								<th className={s.tableActions}>Action</th>
							</tr>
						</thead>
						<tbody>
							{categories.map((dat) => {
								return (
									<tr className={s.tableDescrip}>
										<td>{dat.name}</td>
										<td>{dat.description}</td>
										<td className={s.icons}>
											<FontAwesomeIcon icon={faPencilAlt} size={'1x'} className={s.iconUpdate} onClick={() => updateCategoryModal(dat)} />
											<FontAwesomeIcon icon={faTrashAlt} size={'1x'} className={s.iconDelete} onClick={() => handleDelete(dat)} />
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
					<Button className={s.buttonADD} onClick={openModal}>
						Add Category
					</Button>
				</div>
			</div>
			{/**************************** ADD CATEGORY MODAL ******************************** */}
			<AddCategory data={form} show={show} closeModal={closeModal} handlerChange={handlerChange} insertCategory={insertCategory} />

			{/*************************** UPDATE CATEGORY MODAL ****************************** */}
			<UpdateCategory form={form} showUpdate={showUpdate} closeModalUpdate={closeModalUpdate} handlerChange={handlerChange} updateCategory={updateCategory} />
			{/*************************** AVISO CONFIRMAR MODAL ****************************** */}
			<Confirm tipo={'categories'} show={showCat} setShow={setShowCat} deleted={deleteCategoryP} selected={catSelected} />
		</div>
	);
};

function mapStateToProps(state) {
	return {
		categories: state.categories,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getCategoryP: () => dispatch(getCategories()),
		addCategoryP: (data) => dispatch(AddCategorie(data)),
		updCategoryP: (data) => dispatch(updCategory(data)),
		deleteCategoryP: (id) => dispatch(deleteCategory(id)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Categorys);
