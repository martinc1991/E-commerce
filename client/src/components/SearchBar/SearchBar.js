import React from 'react';

// Bootstrap
import { FormControl, InputGroup } from 'react-bootstrap';

// Font Awesome (iconos)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch as searchIcon } from '@fortawesome/free-solid-svg-icons';

// CSS
import s from '../../styles/Navbar.module.css';

export default function SearchBar() {
	return (
		<InputGroup className={`d-flex`}>
			{/* Input buscador */}
			<FormControl className={`${s.searchInput}`} id='inlineFormInputGroup' placeholder='Busca algo aqui...' />{' '}
			<InputGroup.Append>
				<InputGroup.Text className={`${s.contenedorLupa}`}>
					<FontAwesomeIcon className={`${s.searchIcon}`} icon={searchIcon} />
				</InputGroup.Text>
			</InputGroup.Append>
		</InputGroup>
	);
}
