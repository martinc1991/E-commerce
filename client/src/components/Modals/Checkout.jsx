import React, {useEffect} from 'react';
import s from '../../styles/avisoLoggin.module.css';
import axios from 'axios';
import {Button, Modal, Row, Col, Form } from 'react-bootstrap';
import { useState } from 'react';

const url = "localhost:3001";

const Checkout = ({ checkoutEnd, showCheckout, handlerClick, setShowCheckout, user, order })=>{
    
    const [loading, setLoading] = useState(true);
    
    useEffect(()=> {
        axios.post(`http://${url}/orders/checkout/${order.id}`, user)
    },[])

    return(
        <div>
        <Modal
            show={showCheckout && checkoutEnd}
            onHide={()=> setShowCheckout(false)}
        >
        <Modal.Header className={s.title} closeButton>
          <Modal.Title >
            ICONO CHULO
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={s.cont}>
          <p>
            Genial!, en tu correo electrónico encontrarás la confirmación de tu compra
          </p>
          <div className={s.button}>
            <Button className={s.button1} onClick={()=> handlerClick() }>Aceptar</Button>
          </div>
        </Modal.Body>
      </Modal>
      </div>

    )
}
export default Checkout;