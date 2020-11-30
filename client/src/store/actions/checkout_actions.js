
import axios from 'axios';
import {
    CREATE_ORDER,
    UPDATE_ORDER_TO_CREATE,
    UPDATE_ORDER_TO_PROCESS,
    CHECKOUT_END,
    UPDATE_ORDER_TO_FULL,
    UPDATE_ORDER_TO_REJECT
}from '../constants/constans'
const url = 'localhost:3001';


export const CreateOrder = (cart, idUser)=>{
    return (dispatch) => {
        console.log(cart)
        let cartP = cart.products
        cartP.forEach(x => {
            axios.post(`http://${url}/orders/shopping/${idUser}`, x)
                .then(res => {
                    console.log(res.data.data)
                    dispatch({
                        type: CREATE_ORDER,
                        payload: res.data.data
                    })
                })
                .catch(err => {
                    console.log('No funciono crear Orden ')
                })
        });

    }
}

export const deleteOrderCart = (id) => {
    return (dispatch) => {
        console.log('id: ', id)
        //axios.delete(`http://${url}/orders/shopping/${id}`)
    }
}


export const UpdateOrderToCreateStatus = (idOrder, objCart) => {
    return (dispatch) => {
        console.log(idOrder)
        console.log(objCart)
        axios.put(`http://${url}/orders/shopping/${idOrder}`, objCart)
            .then(order => {
                console.log(order.data.data)
                dispatch({
                    type: UPDATE_ORDER_TO_CREATE,
                    payload: order.data.data
                })
            })
    }
}

export const UpdateOrderToProcessStatus = (idOrder, data) => {
    return (dispatch) => {
        axios.put(`http://${url}/orders/shoppinginprocess/${idOrder}`, data)
            .then(order => {
                console.log(order.data.data)
                dispatch({
                    type: UPDATE_ORDER_TO_PROCESS,
                    payload: order.data.data
                })
            })
    }
}

export const confirmOrder = (id, total, OrderId) => {
    return (dispatch) => {
        console.log(id)
        console.log(total);
        console.log(OrderId)
        axios.post(`http://${url}/orders/confirorder/${id}`, {total, OrderId})
            .then(res => {
                const data = res.data
                console.log(data)
                dispatch({
                    type: CHECKOUT_END,
                    message: data.message,
                    pay: data.pay
                })
    })
    .catch(err => {
        console.log('Falla en el pago')
    })
}}

export const UpdateOrderToFullfilled = (idOrder) => {
    return (dispatch) => {
        console.log(idOrder)
        axios.put(`http://${url}/orders/checkout/${idOrder}`)
            .then(order => {
                console.log(order.data.data)
                dispatch({
                    type: UPDATE_ORDER_TO_FULL,
                    payload: order.data.data
                })
            })
    }
}

export const UpdateOrderToreject = (idOrder) => {
    return (dispatch) => {
        console.log(idOrder)
        axios.put(`http://${url}/orders/checkoutReject/${idOrder}`)
            .then(order => {
                console.log(order.data.data)
                dispatch({
                    type: UPDATE_ORDER_TO_REJECT,
                    payload: order.data.data
                })
            })
    }
}

export const sendEmail = (idOrder, user) => {
    console.log(idOrder, user)
    return (dispatch) => {
        axios.post(`http://${url}/orders//checkout/${idOrder}`, user)
            .then(res => {
                console.log('Email Enviado correctamente.')
            })
    }
}