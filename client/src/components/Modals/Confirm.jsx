import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import s from '../../styles/confirm.module.css';

const Confirm = ({ tipo, show, setShow, selected, deleted }) => {
	const handlerdelect = () => {
		// console.log(selected);
		deleted(selected.id);
		setShow(false);
	};
	return (
		<div>
			<Modal show={show} onHide={() => setShow(false)} dialogClassName='modal-90w' aria-labelledby='example-custom-modal-styling-title'>
				<Modal.Header className={s.title} closeButton>
					<Modal.Title>
						Importante
						<FontAwesomeIcon className={s.icon} icon={faExclamationTriangle} size={'1x'} />
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className={s.cont}>
					{tipo === 'user' ? <p>Estas seguro que deseas eliminar este usuario {selected.email} ?</p> : tipo === 'categories' ? <p>Estas seguro que deseas eliminar esta categoria</p> : tipo === 'products' ? <p>Estas seguro que deseas eliminar este producto</p> : <p>Estas seguro que deseas eliminar esta orden del usuario</p>}

					<di className={s.button}>
						<Button className={s.button1} onClick={() => handlerdelect()}>
							Aceptar
						</Button>
						<Button className={s.button2} onClick={() => setShow(false)}>
							Cancelar
						</Button>
					</di>
				</Modal.Body>
			</Modal>
		</div>
	);
};
export default Confirm;
