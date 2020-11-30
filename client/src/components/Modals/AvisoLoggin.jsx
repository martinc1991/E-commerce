import React from 'react';
import s from '../../styles/avisoLoggin.module.css';
import {Button, Modal, Row, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AvisoLoggin = ({showLoggin, setShowLoggin})=>{
    return(
        <div>
        <Modal
        show={showLoggin}
        onHide={() => setShowLoggin(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header className={s.title} closeButton>
          <Modal.Title >
          ¡Hola!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={s.cont}>
          <p>
            Para hacer un comentario, ingresa tu cuenta
          </p>
          <di className={s.button}>
          <Button className={s.button1} as={Link} to={`/users`}>Soy nuevo</Button>
          <Button className={s.button2} as={Link} to={`/login`}>Ya tengo cuenta</Button>
          </di>
         

        </Modal.Body>
      </Modal>
      </div>

    )
}
export default AvisoLoggin;