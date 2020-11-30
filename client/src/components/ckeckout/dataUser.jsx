import React, {useEffect} from 'react';
import { CreateOrder, UpdateOrderToProcessStatus, deleteOrderCar} from '../../store/actions/checkout_actions';
import { connect } from 'react-redux';
import { addToCart, removeFromCart, updateFromCart, deleteCart } from '../../store/actions/cart_actions';
import { getOrders, deleteOrder } from '../../store/actions/order_actions';
import { Link } from 'react-router-dom';
import s from '../../styles/carrito.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../multimedia/logo.png';
import CardVacio from '../../multimedia/carrtvacio.png';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookie from 'js-cookie';
import { Button, Form, Container, Navbar } from 'react-bootstrap';




const DataUserShopping = ({cartP, UpdateOrderToProcessStatusP,  orderCreatedP, getOrdersP, orderP,userLogin,deleteOrderP}) => {
    const [form, setForm] = useState({
        city:"",
        adress:"",
        phone: "",
        postal: ""
    })
    // const {idUser} = match.params
    console.log('Orden Creada...')
    console.log(orderCreatedP)
    let cartP2 =  cartP.length < 1 ? [] :  cartP[0].products;
    let orderP2 =  orderP.length < 1? [] :  orderP[0].products
    // const  qty = location.search.split('=')[1]



    /********** USEEFECT *********** */
    useEffect(()=> {

        getOrdersP();
    },[])
     /********** USEEFECT *********** */
    console.log('*****ORDER******')
    console.log(userLogin)
    let history = useHistory()

    // const proccesOrder = () => {
    //         alert('Orden No.' + orderCreatedP.id)
    //         OrderProcessP(orderCreatedP.id)
    //         //deleteOrderCartP(cartP[0].id, cartP[0].status)
    //         Cookie.remove('cartItems')
    //         // deleteCartP()
    //         //window.location = '/users/cart'
    //         return
    // }

    const handlerInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handlerSubmit = (e) => {
        e.preventDefault();
        console.log(form)
        UpdateOrderToProcessStatusP(orderCreatedP.id, form)
        history.push('/paymethod')
    }

    console.log(form)
    const handlerDeleteOrder = (idOrder) => {
		deleteOrderP(idOrder)
		Cookie.remove('cartItems')
		window.location = '/'
		return
	}


    return(
        
        <div>

            {/* < Navegacion linksU={enlacesUserSinAdmin} linksA={enlacesUserConAdmin} showSearchbar={false}/> */}
            <div className={`${s.cont_prin1} my-3`}>
                <div className={s.cont1}>
                    <img className={`${s.logo}`} src={logo}></img>
                    <ul>
                        <li><i>1</i><span>Resumen de compra</span></li>
                        <li><i className={s.i}>2</i><span className={s.span}>Datos de envio</span></li>
                        <li><i>3</i><span>Forma de pago</span></li>

                    </ul>
                </div>
            </div>
            <div className={s.cont_form}>
                <Container className={s.contForm}>
                    <h1>Datos de envio</h1>
                    <h6>Indica la ciudad y la direccion donde resiviras los productos</h6>
                <Form onSubmit={handlerSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label className={s.label}>Ciudad</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese la ciudad" required name="city" onChange={handlerInput}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label className={s.label}>Direccion</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese la direccion" required name="adress" onChange={handlerInput}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label className={s.label}>Telefono</Form.Label>
                            <Form.Control type="number" placeholder="Ingrese el telefono" required name="phone"  onChange={handlerInput}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label className={s.label}>Codigo postal</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese el codigo postal" required name="postal" onChange={handlerInput} />
                        </Form.Group>
                        < div className={s.cont_button2}>
                        <Button variant="primary" type="submit" className={s.submitDate}>
                            Continuar
                        </Button>
                        <Button className={s.submitCancel} onClick={() => handlerDeleteOrder(orderCreatedP.id)} >Cancelar compra</Button>
                        </div>
                        
                </Form>
                </Container>
                
                    {/* <div className={s.cont_button1}>
                        <Button className={s.buttonF} >Finalizar compra</Button>{"    "}
                        <Button className={s.buttonFC} >Cancelar compra</Button>

                    </div> */}
             </div>

            
             



                          
        </div>


    )

}


function mapStateToProps(state){
    return {
        cartP: state.cart,
        orderP : state.orders,
        userLogin: state.userLogged,
        orderCreatedP : state.orderCreated
    }
}

function mapDispatchToProps(dispatch){
    return {
        addToCartP : (id, qty) => dispatch(addToCart(id, qty)),
        removeFromCartP : (id) => dispatch(removeFromCart(id)),
        updateFromCartP : (id, qty) => dispatch(updateFromCart(id, qty)),
        deleteCartP: () => dispatch(deleteCart()),
        getOrdersP : () => dispatch(getOrders()),
        CreateOrderP : (cartP2, userId) => dispatch(CreateOrder(cartP2, userId)),
        UpdateOrderToProcessStatusP : (id, data) => dispatch(UpdateOrderToProcessStatus(id, data)),
        deleteOrderP : (id) => dispatch(deleteOrder(id))
        //deleteOrderCartP : (id, status) => dispatch(deleteOrderCart(id, status))
 
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DataUserShopping);