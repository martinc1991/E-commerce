import axios from "axios";

import {
    ADD_CATEGORY,
    GET_CATEGORIES,
    DELETE_CATEGORY,
    MODIFY_CATEGORY,
    ERROR_MESSAGE,
} from '../constants/constans'


const url = "localhost:3001";
let productCategoriesId = [];


export function getCategories()  {
    
    return  (dispatch) => {
        axios.get(`http://${url}/products/category`)
        .then(res => {
            if(res.status === 200){
                dispatch({
                    type: GET_CATEGORIES,
                    categories: res.data.result || []
                })
            }else{
                dispatch({
                    type: ERROR_MESSAGE,
                    categories: 'Error in the Request'
                })                   
            }

        })
        .catch(err => {
            console.log('Error')
        })
    }
}

export function AddCategorie(data){
    
    return async (dispatch) => {
        await axios.post(`http://${url}/products/category`, data)
        .then(res => {
            if(res.status === 201) {
                dispatch({
                    type: ADD_CATEGORY,
                    category: res.data.data,
                })
            }else{
                dispatch({
                    type: ERROR_MESSAGE,
                    message: 'Error al Crear Categoria',
                })
            }
        })
    }
}

export function updCategory(dat){
    console.log(dat.id)
    return (dispatch) => {
        axios.put(`http://${url}/products/category/${dat.id}`, dat)
            .then((res)=> {
                console.log(res)
                if(res.status === 200){
                    dispatch({
                        type: MODIFY_CATEGORY,
                        category: res.data.data
                    })
                } else{
                    dispatch({
                        type: ERROR_MESSAGE,
                        message: 'Error al Actualizar la categoria',
                    })
                }
            })
            .catch(err => {
                console.log('entro al catch de UPDATE ')
            })  
    }
}

export function deleteCategory(id){
    return (dispatch) => {
        axios.delete(`http://${url}/products/category/${id}`)
            .then(res => {
                if(res.status === 200){
                    dispatch({
                        type: DELETE_CATEGORY,
                        category: res.data.data
                    })
                }else{
                    dispatch({
                        type: ERROR_MESSAGE,
                        message: 'Error al eliminar la categoria',
                      });
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}








