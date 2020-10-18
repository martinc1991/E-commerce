// Axios
import axios from 'axios';
import { getUsers, createUser } from './userActions'




import {
    ERROR_MESSAGE,
    ADD_TO_CARD,
    REMOVE_FROM_CART,
    UPDATE_FROM_CART
} from '../constants/constans';

const url = 'localhost:3001';
const userData = {
    email: 'visitante@gmail.com',
    password: '123456',
    role: 'Guest'
}


export function addToCart(id, qty){
    console.log('entre a AddToCart')
    const product = {id, qty}
    let idUser = 1;
    console.log(product)
    return async (dispatch)=> {
        await axios.get(`http://${url}/users`).then(res =>{
            if(res.data.data.length == 0){
                //axios.post(`http://${url}/users`, userData)
                //createUser(userData)
                if(window.confirm('No hay nimgun usuario registrado, desea registrar uno?')){
                    window.location.href = 'http://localhost:3000/users'
                }
            }
        } )  
        axios.post(`http://${url}/users/1/cart`, product)
            .then(res => {
                console.log('*****')
                console.log(res.data.data)
                if(res.status === 200){
                    dispatch({
                        type: ADD_TO_CARD,
                        products: res.data.data
                    })
                }else{
                    dispatch({
                        type: ERROR_MESSAGE,
                        message: 'Error al obtener productos por Categoria'
                   })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}


export function removeFromCart(productId){
    console.log('********id delete**********')
    console.log(productId)
    return (dispatch) => {
        axios.delete(`http://${url}/users/1/cart/${productId}`)
            .then(res => {
                console.log('***********res of the route delete *****************')
                console.log(res.data.data)
                dispatch({
                    type:REMOVE_FROM_CART,
                    payload: res.data.data
                })
            })
            .catch(er => {
                console.log('ERRO EN EL CATHC DE DELETE')
            })
    }
}

export function updateFromCart(id, qty){
    return (dispatch) => {
        axios.put(`http://${url}/users/1/cart`, {id,qty})
            .then(res => {
                dispatch({
                    type:UPDATE_FROM_CART,
                    payload: res.data.data
                })
            })
    }
}