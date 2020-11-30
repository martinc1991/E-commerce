import React from 'react';
import { useEffect } from 'react';
import {connect} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Nav, Navbar, Form, Button, Col, Row, Card, Image } from 'react-bootstrap';
import {Redirect, Link} from 'react-router-dom'
import {logout,  loginActiontest} from '../../store/actions/loginActions'
import Cookie from 'js-cookie';
import {enlacesUser, enlacesUserConAdmin, enlacesUserSinAdmin, enlacesAdmin } from '../../constans/constans';
import Navegacion from '../Navegacion/Navegacion'
import s from '../../styles/profile.module.css';
import placeholder from '../../multimedia/placeholder.png';
import { getOrders } from '../../store/actions/order_actions';


const ProfileUser = ({userLoggedP, logoutP, loginActionP, orders, getOrdersP}) => {

    const history = useHistory();
    console.log('ACA ESTAN LAS ORDENES Y LOS PRODUCTOS', orders)
    useEffect(()=> {
        getOrdersP()
    },[])

    const handlerClick = () => {
    //    history.push('/')
    //    loginActionP()
    //    Cookie.remove('userLoad');
    //    return
    }

    const ordersFiltered = orders.filter(x => x.user.id === userLoggedP.id);
    
    console.log(ordersFiltered)

    return (
        <div className={s.all}>
        <Navegacion linksU={enlacesUserSinAdmin} linksA={enlacesUserConAdmin} showSearchbar={true} />
        <div className={s.background}></div>
        <div className={s.contPrincipal}>
        <Card className={`${s.cardStyle1} ${s.prueba}`}>
            {/* <Image className={s.size} src={placeholder} roundedCircle/> */}
            <Card.Body className={s.cardItemUser}>{userLoggedP.name}</Card.Body>
            <Card.Body className={s.email}>{userLoggedP.email}</Card.Body>
        </Card>
        <Card className={`${s.cardStyle} ${s.compras} ${s.cardStyleOrd}`}>
            <Card.Header className={`${s.cardStyleOrd} text-center`}>
                <h2 className={s.otro}>Historial de compras</h2>
            </Card.Header>
                {ordersFiltered && ordersFiltered.map(x => {
                    if(x.status === "fullfilled"){
                        return (
                            <div>
                            {/* <Card.Body className={`${s.cardItem} w-100`}> */}
                            <Row  className={`${s.cardItem}`}>
                                <Col xs={12} lg={3} className={`text-center text-lg-left`}>
                                    <h2>{x.products[0].name}</h2>
                                    {/* <p>Celular Lg k10 texto largooooo</p> */}
                                    <img src={x.products[0].image} alt="imagen-producto" className={s.image}/>
                                </Col>
                                
                                <Col xs={12} lg={3} className={`text-center text-lg-left ${s.columna}`}>
                                <p>Dirección: {x.adress}</p>
                                <p>Ciudad: {x.city}</p>
                                <p>Método de pago: {x.paymentMethod}</p>
                                </Col>
    
                                <Col xs={12} lg={3} className={`text-center text-lg-left ${s.columna}`}>
                                <p>Teléfono: {x.phone}</p>
                                <p>Código postal: CP{x.postal}</p>
                                <p>Estatus: {x.status}</p>
                                </Col>
    
                                <Col xs={12} lg={3} className={`text-center text-lg-left ${s.columna}`}>
                                <p>Precio: ${x.products[0].order_line.price}</p>
                                <p>Cantidad: {x.products[0].order_line.quantity} U</p>
                                <p>Subtotal: ${x.subTotal}</p>
                                <p className={s.total}>Total: ${x.total}</p>
                                </Col>
                            </Row>
                            {/* </Card.Body> */}
                            </div>
                        )
                    } else {
                        return (
                            <div>No hay ninguna compra en el historial</div>
                        )
                    }
                })}
        </Card>
        </div>
        </div>
    )
}

function mapStateToProps(state){
    return {
        userLoggedP : state.userLogged,
        messageErrorP : state.messageError,
        orders: state.orders
    }
}

function mapDispatchToProps(dispatch){
    return {
        getOrdersP : () => dispatch(getOrders()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfileUser);

//Productos: {x.products.map(p => {
//    return (
//        <div>
//           {p.name}
//         {p.image}
//            {p.order_line.map(o => {
//                return (
//                    <div>
//                        {o.quantity}
//                        {o.price}
//                    </div>
//                )
//            })}
//        </div>
//    )
//})}
