import React from 'react'
import {Table, Button, Container, Modal, FormGroup, Form } from 'react-bootstrap';
import datas from './Data'
import s from '../../styles/adminProduct.module.css'
import Menu from './menu'
import axios from 'axios';
import {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashAlt, faPencilAlt} from '@fortawesome/free-solid-svg-icons';

const url = 'localhost:3001';


const Product = ()=> {
    const [data, setData] = useState([]);
    const [cat, setCat] = useState([]);
    const [productCat, setProdutCat] = useState([]);
    const [form, setForm] = useState({
        name : "",
        description : "",
        price : "",
        stock : "",
        category : [],
        dimentions: "",
        image: "",
    })
    const [show, setShow] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [openCategories, setOpenCategories] = useState(false);


    /*********************** Functions **************************** */
    const getProduct = () => {
        axios.get(`http://${url}/products`)
            .then(res => {
                if(res){
                    console.log(res.data.data)
                    return setData(res.data.data)
                }else{
                    console.log("No hay Datos")
                }
            })
            .catch(err => {
                console.log('Errod')
            })
        //console.log('hola')
    }
    const getCategory = () => {
        axios.get(`http://${url}/products/category`)
            .then(res => {
                if(res){
                    return setCat(res.data.result)
                }else{
                    console.log("No hay Datos")
                }
            })
            .catch(err => {
                console.log('Errod')
            })
        //console.log('hola')
    }

    useEffect(()=> {
        getProduct();
        getCategory()
    }, [])

    console.log(cat)

    const insertProduct = async () => {
        
        form.sku = Math.random()
        await axios.post(`http://${url}/products`, form)
            .then(res => {
                // let dataNew = data
                // dataNew.push({...res.data.data})

                let productId = res.data.data.id;
                let catId = cat.filter(elem => elem.name === form.category)[0].id;
                
                axios.put(`http://${url}/products/${productId}/category/${catId}`)
                    .then(res => {
                        getProduct();
                        setShow(false);
                    })
            })
    }

    const openModal = ()=> { setShow(true)  }
    const closeModal = ()=> { setShow(false)  }
    const closeModalUpdate = ()=> { setShowUpdate(false) }
    const handlerChange = (e) => {  setForm( { ...form, [e.target.name]:e.target.value})  }
   

    const updateProductModal = (product)=> {
        console.log(product)
        let cont = 0;
        let list = data
        console.log(list)
        list.map((dat)=>{
            if(dat.id === product.id) { 
                list[cont].id = product.id
                list[cont].name = product.name
                list[cont].description = product.description
                list[cont].price = product.price
                list[cont].stock = product.stock
                list[cont].category = product.categories[0].name
            }
            cont++
        })
        setShowUpdate(true)
        setForm(product)
        setData(list)
    }


    const updateProduct = (dat)=>{
        //console.log(dat)
        console.log(dat)
        axios.put(`http://${url}/products/${dat.id}`, dat)
            .then(dat => {
                setShowUpdate(false);
                getProduct();
            })
        // console.log(dat)
    }

    const deleteProduct = (id)=>{
        if(window.confirm('Are you sure remove this product?')){
            axios.delete(`http://${url}/products/${id}`)
                .then(dat => {
                    getProduct()
                })
        //     let list = data.filter((dt)=> {
        //         return dt.id !== id
        //     })
        //    return setData(list)
        }

    }

    function validarInput() {
        console.log('sfd')
        document.getElementById("btn_Validar").disabled = !document.getElementById("quanti").value.length;
      }

    return (
        <>
        <div className={s.table_prin}>
            {/* <Menu/> */}
            <div className= {s.cont__table__pr}>
            <Table  striped bordered hover size="sm">
                    <thead className={s.tableTitle}>
                        <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Dimentions</th>
                        <th>Category</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((dat,index) => {
                            return (
                                (dat.categories.length < 1)?
                                <tr className={s.tableDescrip} key={index}>
        
                                    <td>{dat.name}</td>
                                    <td>{dat.description}</td>
                                    <td>{dat.price}</td>
                                    <td>{dat.stock}</td>
                                    <td>{dat.dimentions}</td>
                                    <td>{dat.categories[0].name}</td>
                                    <td className={s.icons}>
                                    <FontAwesomeIcon icon={faPencilAlt} size={'1x'} className={s.iconUpdate} onClick={()=> updateProductModal(dat)} />
                                    <FontAwesomeIcon icon={faTrashAlt} size={'1x'} className={s.iconDelete} onClick={() => deleteProduct(dat.id)} />                                  
                                        {/* <Button className={s.buttonDelete} onClick={() => deleteProduct(dat.id)}>Delete</Button>{"  "}
                                        <Button className={s.buttonUp} onClick={()=> updateProductModal(dat)}>Update</Button> */}
                                    </td>
                                    
                                </tr>
                                :
                                <tr className={s.tableDescrip} key={index}>
            
                                    <td>{dat.name}</td>
                                    <td>{dat.description}</td>
                                    <td>{dat.price}</td>
                                    <td>{dat.stock}</td>
                                    <td>{dat.dimentions}</td>
                                    <td>{dat.categories[0].name}</td>
                                    <td className={s.icons}>
                                    <FontAwesomeIcon icon={faPencilAlt} size={'1x'} className={s.iconUpdate} onClick={()=> updateProductModal(dat)} />
                                    <FontAwesomeIcon icon={faTrashAlt} size={'1x'} className={s.iconDelete} onClick={() => deleteProduct(dat.id)} />                                   
                                        {/* <Button className={s.buttonDelete} onClick={() => deleteProduct(dat.id)}>Delete</Button>{"  "}
                                        <Button className={s.buttonUp} onClick={()=> updateProductModal(dat)}>Update</Button> */}
                                    </td>
                                
                                </tr>
                            )
                        })}
                    </tbody>
            </Table>
            <Button className={s.buttonADD} onClick={openModal}>Add Product</Button>
            </div>
        </div>
        {/**************************** MODAL ADD ******************************** */}
        <div>
            <Modal 
                show={show}
                backdrop="static"
                onHide={closeModal}
                keyboard={false}
                className={s.cont_prin}
                >
                    <Modal.Header closeButton className={s.title} >
                        Add Product
                    </Modal.Header>

                    <Modal.Body className={s.cont} >
                    <Form.Group>
                            <Form.Label className={s.titles} >Id:</Form.Label>
                            <input className={s.inputs} type="text" name="name" value={data.length+1} readOnly/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={s.titles}>Name:</Form.Label>
                            <input className={s.inputs} type="text" name="name"  onChange={handlerChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={s.titles}>Description:</Form.Label>
                            <input className={s.inputs} type="text" name="description" onChange={handlerChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={s.titles}>Price:</Form.Label>
                            <input className={s.inputs} type="number" name="price" onChange={handlerChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={s.titles}>Stock:</Form.Label>
                            <input className={s.inputs} type="number" name="stock" onChange={handlerChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={s.titles}>Image:</Form.Label>
                            <input className={s.inputs} type="text" name="image" onChange={handlerChange} placeholder='http://www.image.com'/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={s.titles}>Dimention:</Form.Label>
                            <input className={s.inputs} type="text" name="dimentions" onChange={handlerChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={s.titles}>Category: </Form.Label>
                            <select className={s.inputs} onChange={handlerChange} name="category">
                            <option value="">....</option>
                                {cat.map((d)=>{
                                    return (
                                        <option value={d.name}>{d.name}</option>
                                    )
                                })}

                            </select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer className={s.buttons} >
                        <Button className={s.buttonAdd} onClick={insertProduct}>Add</Button>
                        <Button  className={s.buttonCancel} onClick={closeModal}>Cancel</Button>
                    </Modal.Footer>
            </Modal>
        </div>
        {/**************************** MODAL CATEGORIES ******************************** */}
        {/* <div>
            <Modal 
                show={openCategories} 
                onHide={()=> setOpenCategories(false)} 
                centered={true}
                backdrop='static'
                aria-labelledby="contained-modal-title-vcenter"
                animation={true}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Choose at least one category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        pruebaaaaaaaaa
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={()=> setOpenCategories(false)}>done!</Button>
                </Modal.Footer>
            </Modal>
        </div> */}
        {/**************************** MODAL UPDATE ******************************** */}
        <div>
        <Modal 
                show={showUpdate}
                backdrop="static"
                onHide={closeModalUpdate}
                keyboard={false}
                >
                    <Modal.Header closeButton className={s.title} >
                        Update Product
                    </Modal.Header>

                    <Modal.Body className={s.cont}>
                    <Form.Group>
                            <Form.Label className={s.titles}>Id:</Form.Label>
                            <input className={s.inputs} type="text" name="name"  readOnly value={form.id} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={s.titles}>Name:</Form.Label>
                            <input className={s.inputs} type="text" name="name"  onChange={handlerChange} value={form.name}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={s.titles}>Description:</Form.Label>
                            <input className={s.inputs} type="text" name="description" onChange={handlerChange} value={form.description}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={s.titles}>Price:</Form.Label>
                            <input className={s.inputs} type="number" name="price" onChange={handlerChange} value={form.price}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={s.titles}>Stock:</Form.Label>
                            <input className={s.inputs} type="number" name="stock" onChange={handlerChange} value={form.stock}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={s.titles}>Image:</Form.Label>
                            <input className={s.inputs} type="text" name="image" onChange={handlerChange} placeholder='http://www.image.com' value={form.image}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={s.titles}>Dimention:</Form.Label>
                            <input className={s.inputs} type="text" name="dimention" onChange={handlerChange}  value={form.dimentions}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={s.titles}>Category: </Form.Label>
                            <select className={s.inputs} onChange={handlerChange} name="category" value={form.category} >
                            <option value="">....</option>
                                {cat.map((d)=>{
                                    return (
                                        <option value={d.name} >{d.name}</option>
                                    )
                                })}

                            </select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer className={s.buttons}>
                        <Button className={s.buttonAdd} onClick={() => updateProduct(form)}>Update</Button>
                        <Button className={s.buttonCancel} onClick={closeModalUpdate}>Cancel</Button>
                    </Modal.Footer>
            </Modal>
        </div>
        </>
    )
}
export default Product