import React from 'react';
import {Table, Button } from 'react-bootstrap';
import AddCategory from '../Modals/AddCategory';
import UpdateCategory from '../Modals/UpdateCategory';
import axios from 'axios';
import {useState, useEffect} from 'react';
import s from '../../styles/adminCategories.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashAlt, faPencilAlt} from '@fortawesome/free-solid-svg-icons';


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
        }

    }
    /*********************** Component Life Cycle *************************** */
    useEffect(()=> {
        getCategory();
    }, [])

    /****************************** Render ********************************** */
    return (
        <div>
            {/* <Menu/> */}
            <div className={s.table_prin}>
                {/* <Menu/> */}
                <div>
                <Table striped bordered hover size="sm">
                        <thead className={s.tableTitle}>
                            <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th className={s.tableActions}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(dat => {
                                return (
                                    <tr className={s.tableDescrip}>
                                        <td>{dat.name}</td>
                                        <td>{dat.description}</td>
                                        <td className={s.icons}>
                                            <FontAwesomeIcon icon={faPencilAlt} size={'1x'} className={s.iconUpdate} onClick={()=> updateCategoryModal(dat)} />
                                            <FontAwesomeIcon icon={faTrashAlt} size={'1x'} className={s.iconDelete} onClick={() => deleteCategory(dat.id)} />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                </Table>
                <Button className={s.buttonADD} onClick={openModal}>Add Category</Button>
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
        </div>
    )
}
export default Categorys;