import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { addToCart } from '../../store/actions/cart_actions'
import { Link } from 'react-router-dom'
import s from '../../styles/carrito.module.css'
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../multimedia/logo.png';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import Navegacion from '../Navegacion/Navegacion'


const CartShop = ({match, location, addToCartP, cartP}) => {
    const {idUser} = match.params
    const  qty = location.search.split('=')[1]
    console.log('Cantidad: ' + qty)
    console.log(cartP)
    var enlacesUser = [
        { text: 'Catalogo', to: '/products/catalogo' },
        { text: 'FAQs', to: '/' },
        { text: 'Contacto', to: '/' },
        { text: 'Ayuda', to: '/' },
        { text: 'Registro', to: '/users' }, // Por ahora para probar nomas
        { text: 'ADMIN', to: '/admin' },
    ];


    /****************************** USEEFECT ******************************* */
    useEffect(()=> {
        addToCartP(idUser, qty)
    })
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
                                        <td className={s.product}>
                                            <div className={s.cont_img}>
                                            {/* <img src={product.img}></img> */}
                                            </div>
                                            <a>{product.name}</a>
                                        </td>
                                        <td>Se enviara Pronto</td>
                                        <td className={s.PreCant}>{product.price}</td>
                                        <div className={s.cont_cant}>
                                        <td className={s.cantidad}>
                                            <div className={s.cont_button}>
                                            <div className={s.button1}  >-</div>
                                            <input className={s.input} type="text" name="name" value={qty} readOnly/>
                                            {/* <div className={s.button2} onClick={()=>handlerIncrement(index)}>+</div> */}
                                            </div>                                       
                                        </td>
                                        </div>
                                    <td className={s.PreCant}>$20.000</td>
                                        <td className={s.icon}>
                                        <FontAwesomeIcon icon={faTrashAlt} size={'1x'} className={s.iconDelete} />
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
                                    <td className={s.subPrecio}>$jjjj</td>
                                </tr>                                
                                <tr>
                                    <td className={s.subinfo2}>Total</td>
                                    <td className={s.subPrecio}>rrrrrr</td>
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
        addToCartP : (id, qty) => dispatch(addToCart(id, qty)) 
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CartShop);