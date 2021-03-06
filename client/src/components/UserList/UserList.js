import { faSignInAlt as signIn, faUser as userLogin } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import s from '../../styles/Navbar.module.css';

function UserList(props) {
	// console.log('Acaaaaaaaa', props.userLogin);
	if (!props.userLogin) {
		return (
			<div className={s.list}>
				<Dropdown>
					<Dropdown.Toggle variant='Info' id='dropdown-basic' className={s.btn}>
						Usuario
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<Dropdown.Item className={s.item}>
							<Link to='/users' className={s.itemA}>
								Registrate{!!props.showSearchbar && <FontAwesomeIcon className={`flex-fill ${s.userLoginIcon} mx-2`} icon={userLogin} size={'1x'} />}
							</Link>
						</Dropdown.Item>
						<Dropdown.Item className={s.item}>
							<Link to='/login' className={s.itemA}>
								Ingresar{!!props.showSearchbar && <FontAwesomeIcon className={`flex-fill ${s.userLoginIcon} mx-2`} icon={signIn} size={'1x'} />}
							</Link>
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</div>
		);
	} else {
		// console.log('Acaaaaaaaa', props.linksA, props.linksU);
		return (
			<div className={s.list}>
				<Dropdown>
					<Dropdown.Toggle variant='Info' id='dropdown-basic' className={s.btn}>
						{props.userLogin.name}
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<Dropdown.Item className={s.item}>
							<Link to='/profile'>
								<span className={s.itemA}>Perfil</span>
							</Link>
						</Dropdown.Item>
						<Dropdown.Item className={s.item}>
							<Link to='/' className={`${s.itemA}`} onClick={props.handlerClick}>
								Cerrar sesión
							</Link>
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</div>
		);
	}
}

export default UserList;
