import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getCategories, getProductByCategory } from '../../store/actions/category_actions';
import s from '../../styles/filter.module.css';

function Filter({ categories, getProductByCategoryP, products, handlerSelect }) {
	return (
		<>
			<Row>
				<Col xs={12} md={12} lg={12} className={s.sidebar}>
					<header className={s.resul}>
						<label className={`${s.border}`} href='#'>
							Resultados ({products.length})
						</label>
					</header>
					<div className={`${s.content}`}>
						<div>
							<div className={s.titleCat}>
								<h3>Categorias</h3>
							</div>
							{categories.map((category, i) => {
								return (
									<div className={s.cat} onClick={() => getProductByCategoryP(category.name)} key={i}>
										<h3>{category.name}</h3>
									</div>
								);
							})}
						</div>
						<div className={s.most}>
							<a href='/products/catalogo'>Mostrar Todo</a>
						</div>
					</div>
				</Col>
			</Row>
		</>
	);
}
function mapStateToProps(state) {
	return {
		categories: state.categories,
		products: state.products,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		getCategoryP: () => dispatch(getCategories()),
		getProductByCategoryP: (name) => dispatch(getProductByCategory(name)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
