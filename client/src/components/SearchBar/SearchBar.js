import React from 'react';
import { useState } from 'react';

// Bootstrap
import { FormControl, InputGroup, Button } from 'react-bootstrap';

// Font Awesome (iconos)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch as searchIcon } from '@fortawesome/free-solid-svg-icons';

// CSS
import s from '../../styles/Navbar.module.css';

export default function SearchBar(props) {
	const [product, setProduct] = useState('');
	let { onSearch } = props;

	const handlerInput = (e) => {
		console.log(e.target.value);
		if (e.target.value === '') {
			setProduct('');
		}
		setProduct(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		e.target.value = '';
		console.log('OK funciona Search');
		//window.location.href = `http://${url}/products/catalogo`
		onSearch(product);
		let textInput = document.getElementById('inlineFormInputGroup');
		textInput.value = '';
		setProduct(textInput.value);
		return;
	};

	return (
		<form onSubmit={onSubmit}>
			<InputGroup className={`d-flex`}>
				{/* Input buscador */}
				<FormControl className={`${s.searchInput} shadow-none`} id='inlineFormInputGroup' placeholder='Busca algo aqui...' onChange={handlerInput} />{' '}
				<InputGroup.Append>
					<Button variant='primary' type='submit' className={`${s.contenedorLupa}`}>
						{/* <InputGroup.Text  > */}
						<FontAwesomeIcon className={`${s.searchIcon} mb-1`} icon={searchIcon} />
						{/* </InputGroup.Text> */}
					</Button>
				</InputGroup.Append>
			</InputGroup>
		</form>
	);
}
