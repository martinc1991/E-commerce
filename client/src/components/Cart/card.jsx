import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { addToCart, removeFromCart } from '../../store/actions/cart_actions'
import { Link } from 'react-router-dom'
import s from '../../styles/carrito.module.css'
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../multimedia/logo.png';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import Navegacion from '../Navegacion/Navegacion'
import { useState } from 'react'



const CartShop = ({match, location, addToCartP, cartP, removeFromCartP}) => {
    const [quantity, setQuantity] = useState(0)
    const {idUser} = match.params
    const  qty = location.search.split('=')[1]
    var enlacesUser = [
        { text: 'Catalogo', to: '/products/catalogo' },
        { text: 'FAQs', to: '/' },
        { text: 'Contacto', to: '/' },
        { text: 'Ayuda', to: '/' },
        { text: 'Registro', to: '/users' }, // Por ahora para probar nomas
        { text: 'ADMIN', to: '/admin' },
    ];


    const increment = (dat)=> {
        console.log(dat)
    }

    const decrement = (dat)=> {
        console.log(dat)
    }

    const handlerInput = (id, qty) => {
        console.log("entre: "+ qty)
        setQuantity(qty)
        return addToCartP(id, qty)
    }



    /****************************** USEEFECT ******************************* */
    useEffect(()=> {
        if(idUser){
            addToCartP(idUser, qty)
        }

    },[])
     /****************************** USEEFECT ******************************* */


    return(
        <div>
            < Navegacion links={enlacesUser} showSearchbar={false}/>
            <div className={s.cont_prin}>
                <div className={s.cont1}>
                    <img className={`${s.logo}`} src={logo}></img>
                    <ul>
                        <li><i>1</i><span>Resumen de compra</span></li>
                        <li><i>2</i><span>Datos de envio</span></li>
                        <li><i>3</i><span>Forma de pago</span></li>

                    </ul>
                </div>
                <div className={s.cont2}>
                    <h1>Mi carrito</h1>
                    <div className={s.cont_table}>
                        <Table  size="sm">
                            <thead className={s.tableTitle}>
                                <tr>
                                    <th>Producto</th>
                                    <th>Envio</th>
                                    <th>Precio</th>
                                    <th className={s.cantidadTitle}>Cantidad</th>
                                    <th>Total</th>
                                    <th className={s.nada}></th>
                                </tr>
                            </thead>
                            <tbody>

                                {cartP.map((product, index) =>{
                                    return(
                                        <tr className={s.tableDescrip} >
                                        <Link to={'/products/product/' + product.id}>
                                            <td className={s.product}>
                                                <div className={s.cont_img}>
                                                <img src={product.image}></img>
                                                </div>
                                                <a>{product.name}</a>
                                            </td>
                                        </Link>
                                        <td >Se enviara Pronto</td>
                                        <td className={s.PreCant}>$ {product.price}</td>
                                         {/* <div className={s.cont_cant}> */}
                                        <td className={s.cantidad}>
                                             {/* <div className={s.button1} onClick={() => increment(product)}>-</div>  */}
                                            {/* <input className={s.input} type="number" name="name" value={product.qty}  onChange={(e)=> addToCartP(product.id, e.target.value)}/> */}
                                            {/* {<div className={s.button2} onClick={() => decrement(product)}>+</div> } */}
                                            <select name='Cantidad' id='Cantidad' value={product.qty} onChange={(e) => addToCartP(product.id, e.target.value)}>
                                                {[...Array(product.stock).keys()].map(x => {
                                                    return (
                                                        <option value={x+1}>{x+1}</option>
                                                    )
                                                })}
							                </select>

                                        </td>
                                        {/* </div> */}
                                    <td className={s.PreCant}>$ {product.qty * product.price}</td>
                                        <td className={s.icon}>
                                        <FontAwesomeIcon icon={faTrashAlt} size={'1x'} className={s.iconDelete} onClick={() => removeFromCartP(product.id)} />
                                        </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </Table>
                    </div>
                    <div className={s.cont_total}>
                        <div className={s.total}>
                            <Table striped borderless size="sm">
                            <tbody  className={s.tabletotal}>
                                <tr>
                                    <td className={s.subinfo1}>Subtotal</td>
                                    <td className={s.subPrecio}>$ {cartP.reduce((a,c) => a + c.qty*c.price,0)}</td>
                                </tr>
                                <tr>
                                    <td className={s.subinfo1}>Iva</td>
                                    <td className={s.subPrecio}>$ { Math.trunc(cartP.reduce((a,c) => a + c.qty*c.price,0) * 0.19)  }</td>
                                </tr>
                                <tr>
                                    <td className={s.subinfo2}>Total</td>
                                    <td className={s.subPrecio}>$ { (Math.trunc(cartP.reduce((a,c) => a + c.qty*c.price,0) / 1.19)) + cartP.reduce((a,c) => a + c.qty*c.price,0) }</td>
                                </tr>
                            </tbody>
                            </Table>

                        </div>
                    </div>
                    <div className={s.cont_button1}>
                        <Button className={s.buttonF}>Finalizar compra</Button>

                    </div>

                </div>

            </div>



        </div>


    )

}


function mapStateToProps(state){
    return {
        cartP: state.cart,
    }
}

function mapDispatchToProps(dispatch){
    return {
        addToCartP : (id, qty) => dispatch(addToCart(id, qty)),
        removeFromCartP : (id) => dispatch(removeFromCart(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CartShop);