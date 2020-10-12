import React from 'react';
import {Table, Button } from 'react-bootstrap';
import AddCategory from '../Modals/AddCategory';
import UpdateCategory from '../Modals/UpdateCategory';
import s from '../styles/styles.module.css';
import axios from 'axios';
import {useState, useEffect} from 'react'


const url = 'localhost:3001';

const Categorys = () => {
    /*********************** Local States ************************* */
    const [data, setData] = useState([]);
    const [form, setForm] = useState({ name : "", description : "" });
    const [show, setShow] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    /*********************** Functions **************************** */
    const openModal = ()=> { setShow(true)  }
    const closeModal = ()=> { setShow(false)  }
    const closeModalUpdate = ()=> { setShowUpdate(false)  }
    const handlerChange = (e) => {  setForm({ ...form, [e.target.name]:e.target.value})  }
    
    const getCategory = () => {
        axios.get(`http://${url}/products/category`)
            .then(res => {
                if(res) return setData(res.data.result)
                else console.log("No hay Datos")
            })
            .catch(err => {
                console.log('Error')
            })
    }

    const insertCategory = async () => {
        await axios.post(`http://${url}/products/category`, form)
            .then(res => {
                getCategory()
                setShow(false)
            })
    }

    const updateCategoryModal = (category)=> {
        let list = data;
        list.map((dat, index)=>{
            if(dat.id === category.id) {
                list[index].name = category.name;
                list[index].description = category.description;
            }
        })
        setShowUpdate(true);
        setForm(category);
        setData(list);
    }

    const updateCategory = (dat)=>{
        axios.put(`http://${url}/products/category/${dat.id}`, dat)
            .then(dat => {
                setShowUpdate(false);
                getCategory();
            })
    }

    const deleteCategory = (id)=>{
        if(window.confirm('Are you sure remove this product?')){
            axios.delete(`http://${url}/products/category/${id}`)
                .then(dat => {
                    getCategory()
                })
        //     let list = date.filter((dt)=> {
        //         return dt.id !== id
        //     })
        //    return setData(list)
        }

    }
    /*********************** Component Life Cycle *************************** */
    useEffect(()=> {
        getCategory();
    }, [])

    /****************************** Render ********************************** */
    return (
        <>
        {/* <Menu/> */}
        <div className={s.cont__Form__Admin__Pr}>
            {/* <Menu/> */}
            <div className= {s.cont__table__pr}>
            <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(dat => {
                            return (
                                <tr>
                                    <td>{dat.name}</td>
                                    <td>{dat.description}</td>
                                    <td>
                                        <Button variant="danger" onClick={() => deleteCategory(dat.id)}>Delete</Button>{"  "}
                                        <Button variant="primary" onClick={() => updateCategoryModal(dat)}>Update</Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
            </Table>
            <Button variant="success" onClick={openModal}>Add Category</Button>
            </div>
        </div>
        {/**************************** ADD CATEGORY MODAL ******************************** */}
        <AddCategory 
            data={data} 
            show={show} 
            closeModal={closeModal} 
            handlerChange={handlerChange} 
            insertCategory={insertCategory} 
        />

        {/*************************** UPDATE CATEGORY MODAL ****************************** */}
        <UpdateCategory 
            form={form} 
            showUpdate={showUpdate} 
            closeModalUpdate={closeModalUpdate} 
            handlerChange={handlerChange} 
            updateCategory={updateCategory} 
        />
        </>
    )
}
export default Categorys;