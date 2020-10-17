// Axios
import axios from 'axios';


import {
    ERROR_MESSAGE,
    ADD_TO_CARD,
    REMOVE_FROM_CART
} from '../constants/constans';

const url = 'localhost:3001';


export function addToCart(id, qty){
    console.log('entre a AddToCart')
    return (dispatch)=> {
        axios.get(`http://${url}/products/product/${id}`)
            .then(res => {
                if(res.status === 200){
                    dispatch({
                        type: ADD_TO_CARD,
                        products: {
                            qty: qty,
                            id: res.data.data.id,
                            description: res.data.data.description,
                            image:res.data.data.image,
                            name:res.data.data.name,
                            price: res.data.data.price,     
                            stock: res.data.data.stock                    
                        } 
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
    return (dispatch) => {
        dispatch({
            type:REMOVE_FROM_CART,
            payload: productId
        })
    }
}