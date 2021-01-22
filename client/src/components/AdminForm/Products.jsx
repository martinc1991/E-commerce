import { faPencilAlt, faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { enlacesAdmin, enlacesUserSinAdmin } from '../../constants/constants';
import { getCategories } from '../../store/actions/category_actions';
import { addProduct, addProductCat, dltProduct, dltProductCat, getProducts, updProduct } from '../../store/actions/product_actions';
import s from '../../styles/adminProduct.module.css';
import Footer from '../Footer/Footer';
import AddCategories from '../Modals/AddCategories';
import AddProduct from '../Modals/AddProduct';
import AddProductCategories from '../Modals/AddProductCategories';
import Confirm from '../Modals/Confirm';
import UpdateProduct from '../Modals/UpdateProduct';
import Navegacion from '../Navegacion/Navegacion';

const Product = ({ productsP, getCategoryP, getProductP, addProductP, categoriesP, updateProductP, deleteProductP, addProductCatP, dltProductCatP }) => {
	/*********************** Local States ************************* */
	const [data, setData] = useState([]);
	const [dataObject, setDataObject] = useState({});
	const [productCat, setProdutCat] = useState([]);
	const [form, setForm] = useState({
		name: '',
		description: '',
		price: '',
		stock: '',
		category: [],
		dimentions: '',
		image: '',
	});
	const [show, setShow] = useState(false);
	const [showUpdate, setShowUpdate] = useState(false);
	const [showCategories, setShowCategories] = useState(false);
	const [editCategories, setEditCategories] = useState(false);
	const [showProd, setShowProd] = useState(false);
	const [ProdSelected, setProdSelected] = useState({});

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
	const handlerClick = (dat) => {
		setDataObject(dat);
		setEditCategories(true);
	};

	const updateProductModal = (product) => {
		let cont = 0;
		let list = data;
		list.map((dat) => {
			if (dat.id === product.id) {
				list[cont].id = product.id;
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

	const handlerProductCat = (e) => {
		if (e.target.checked) {
			if (!productCat.includes(e.target.value)) {
				setProdutCat([...productCat, e.target.value]);
			}
		} else {
			let catIndex = productCat.indexOf(e.target.value);
			productCat.splice(catIndex, 1);
			setProdutCat(productCat);
		}
		console.log(productCat);
		return;
	};

	const insertProduct = async (product) => {
		product.sku = Math.random();
		product.category = productCat;
		let catIds = [];
		product.category.forEach((selectedCat) => {
			catIds.push(categoriesP.filter((elem) => elem.name === selectedCat)[0].id);
		});
		addProductP(product, catIds);
		setShow(false);
		setProdutCat([]);
	};

	const updateProduct = (dat) => {
		updateProductP(dat);
		setShowUpdate(false);
		// getProductP();
		return;
	};
	const handleDelete = function (product) {
		setShowProd(true);
		setProdSelected(product);
	};

	const addProductCategories = () => {
		let productId = dataObject.id;
		let catIds = [];
		productCat.forEach((selectedCat) => catIds.push(categoriesP.filter((elem) => elem.name === selectedCat)[0].id));
		addProductCatP(productId, catIds);
		setDataObject({});
		setProdutCat([]);
		setEditCategories(false);
	};

	const deleteProductCategories = (productId, catId) => {
		dltProductCatP(productId, catId);
	};

	/*********************** Component Life Cycle *************************** */
	useEffect(() => {
		getCategoryP();
		getProductP();
	}, []);

	/****************************** Render ********************************** */
	return (
		<div style={{ margin: 0 }}>
			<div>
				<Navegacion linksU={enlacesUserSinAdmin} linksA={enlacesAdmin} showSearchbar={false} />
				<div className={s.table_prin}>
					<Table striped bordered hover size='sm' responsive='lg'>
						<thead className={s.tableTitle}>
							<tr>
								<th>Name</th>
								<th className={s.tibleThDescrip}>Description</th>
								<th>Price</th>
								<th>Stock</th>
								<th>Dimentions</th>
								<th>Category</th>
								<th className={s.tableActions}>Action</th>
							</tr>
						</thead>
						<tbody>
							{productsP.map((dat, index) => {
								return dat.categories && dat.categories.length < 1 ? (
									<tr className={s.tableDescrip} key={index}>
										<td>{dat.name}</td>
										<td>{dat.description}</td>
										<td>{dat.price}</td>
										<td>{dat.stock}</td>
										<td>{dat.dimentions}</td>
										<td>
											<FontAwesomeIcon icon={faPlusCircle} size={'1x'} className={s.iconAdd} onClick={() => handlerClick(dat)} />
										</td>
										<td className={s.icons}>
											<FontAwesomeIcon icon={faPencilAlt} size={'1x'} className={s.iconUpdate} onClick={() => updateProductModal(dat)} />
											<FontAwesomeIcon icon={faTrashAlt} size={'1x'} className={s.iconDelete} onClick={() => handleDelete(dat)} />
											{/* <Button className={s.buttonDelete} onClick={() => deleteProduct(dat.id)}>Delete</Button>{"  "}
                                        <Button className={s.buttonUp} onClick={()=> updateProductModal(dat)}>Update</Button> */}
										</td>
									</tr>
								) : (
									<tr className={s.tableDescrip} key={index}>
										<td>{dat.name}</td>
										<td>{dat.description}</td>
										<td>{dat.price}</td>
										<td>{dat.stock}</td>
										<td>{dat.dimentions}</td>
										<td>
											{dat.categories &&
												dat.categories.map((category) => {
													let productId = dat.id;
													let catId = category.id;
													return (
														<h6 className={s.tableDescrip}>
															{category.name}{' '}
															<span onClick={() => deleteProductCategories(productId, catId)} className={s.spanDelete}>
																x
															</span>
														</h6>
													);
												})}
											<FontAwesomeIcon icon={faPlusCircle} size={'1x'} className={s.iconAdd} onClick={() => handlerClick(dat)} />
										</td>
										<td className={s.icons}>
											<FontAwesomeIcon icon={faPencilAlt} size={'1x'} className={s.iconUpdate} onClick={() => updateProductModal(dat)} />
											<FontAwesomeIcon icon={faTrashAlt} size={'1x'} className={s.iconDelete} onClick={() => handleDelete(dat)} />
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
					<Button className={s.buttonADD} onClick={openModal}>
						Add Product
					</Button>
				</div>
			</div>
			{/**************************** ADD PRODUCT MODAL ******************************** */}
			<AddProduct data={data} form={form} show={show} closeModal={closeModal} handlerChange={handlerChange} insertProduct={insertProduct} setShowCategories={setShowCategories} productCat={productCat} categories={categoriesP} />

			{/*********************** ADD PRODUCT CATEGORIES MODAL ************************** */}
			<AddProductCategories categories={categoriesP} showCategories={showCategories} handlerProductCat={handlerProductCat} setShowCategories={setShowCategories} />

			{/************************** UPDATE PRODUCT MODAL ******************************** */}
			<UpdateProduct form={form} showUpdate={showUpdate} closeModalUpdate={closeModalUpdate} handlerChange={handlerChange} updateProduct={updateProduct} setShowCategories={setShowCategories} />

			{/************************** EDIT CATEGORIES MODAL ******************************* */}
			<AddCategories cat={categoriesP} editCategories={editCategories} handlerProductCat={handlerProductCat} addProductCategories={addProductCategories} setEditCategories={setEditCategories} />
			{/*************************** AVISO CONFIRMAR MODAL ****************************** */}
			<Confirm tipo={'products'} show={showProd} setShow={setShowProd} deleted={deleteProductP} selected={ProdSelected} />
			<Footer></Footer>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		productsP: state.products,
		categoriesP: state.categories,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getCategoryP: () => dispatch(getCategories()),
		getProductP: () => dispatch(getProducts()),
		addProductP: (product, catIds) => dispatch(addProduct(product, catIds)),
		updateProductP: (dat) => dispatch(updProduct(dat)),
		deleteProductP: (id) => dispatch(dltProduct(id)),
		addProductCatP: (productId, catIds) => dispatch(addProductCat(productId, catIds)),
		dltProductCatP: (productId, catId) => dispatch(dltProductCat(productId, catId)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
