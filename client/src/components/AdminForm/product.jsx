import React from 'react'
import {Table, Button, Modal, Form } from 'react-bootstrap';
import AddProduct from '../Modals/AddProduct';
import AddProductCategories from '../Modals/AddProductCategories';
import UpdateProduct from '../Modals/UpdateProduct';
import s from '../styles/styles.module.css'
import axios from 'axios';
import {useState, useEffect} from 'react'

const url = 'localhost:3001';

const Product = ()=> {
    /*********************** Local States ************************* */
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
    const [showCategories, setShowCategories] = useState(false);


    /*********************** Functions **************************** */
    const openModal = ()=> { setShow(true)  }
    const closeModal = ()=> { setShow(false)  }
    const closeModalUpdate = ()=> { setShowUpdate(false) }
    const handlerChange = (e) => {  setForm({ ...form, [e.target.name]:e.target.value})  }
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
                list[cont].category = product.category
            }
            cont++
        })
        setShowUpdate(true)
        setForm(product)
        setData(list)
    }

    const getProduct = () => {
        axios.get(`http://${url}/products`)
            .then(res => {
                if(res) return setData(res.data.data)
                else console.log("No hay Datos")
            })
            .catch(err => {
                console.log('Error')
            })
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
                console.log('Error')
            })
    }

    const handlerProductCat = (e) => {
        
        if (e.target.checked){
            if (!productCat.includes(e.target.value)){
                setProdutCat([...productCat, e.target.value]);
            }
        }
        else {
            let catIndex = productCat.indexOf(e.target.value);
            productCat.splice(catIndex,1)
            setProdutCat(productCat);
        }
        return;
    }

    const insertProduct = async () => {
        
        form.sku = Math.random();
        form.category = productCat;
        await axios.post(`http://${url}/products`, form)
            .then(res => {
                let productCategoriesId = [];
                let productId = res.data.data.id;
                form.category.forEach(selectedCat => {
                    productCategoriesId.push(cat.filter(elem => elem.name === selectedCat)[0].id);
                })
                
                productCategoriesId.forEach(catId => {
                    axios.put(`http://${url}/products/${productId}/category/${catId}`)
                        .then(()=>{
                            getProduct();
                            setShow(false);
                            setProdutCat([]);
                        })
                })
            })
    }

    const deleteProductCat = (productId, catId) => {
        axios.delete(`http://${url}/products/${productId}/category/${catId}`)
            .then(()=>{
                getProduct();
            })
    }

    const updateProduct = (dat)=>{
        axios.put(`http://${url}/products/${dat.id}`, dat)
            .then(dat => {
                setShowUpdate(false);
                getProduct();
            })
    }

    const deleteProduct = (id)=>{
        if(window.confirm('Are you sure remove this product?')){
            axios.delete(`http://${url}/products/${id}`)
                .then(dat => {
                    getProduct()
                })
        }
    }

    /*********************** Component Life Cycle *************************** */
    useEffect(()=> {
        getProduct();
        getCategory()
    }, [])

    /****************************** Render ********************************** */
    return (
        <div>
        <div>
            {/* <Menu/> */}
            <div className= {s.cont__table__pr}>
            <Table striped bordered hover>
                    <thead>
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
                                <tr key={index}>
        
                                    <td>{dat.name}</td>
                                    <td>{dat.description}</td>
                                    <td>{dat.price}</td>
                                    <td>{dat.stock}</td>
                                    <td>{dat.dimentions}</td>
                                    <td>{""}</td>
                                    <td>
                                        <Button variant="danger" onClick={() => deleteProduct(dat.id)}>Delete</Button>{"  "}
                                        <Button variant="primary" onClick={()=> updateProductModal(dat)}>Update</Button>
                                    </td>
                                </tr>
                                :
                                    <tr key={index}>
            
                                    <td>{dat.name}</td>
                                    <td>{dat.description}</td>
                                    <td>{dat.price}</td>
                                    <td>{dat.stock}</td>
                                    <td>{dat.dimentions}</td>
                                    <td>{dat.categories.map(category => {   
                                            let productId = dat.id;
                                            let catId = category.id;
                                            return <h6>{category.name} <span onClick={() => deleteProductCat(productId, catId)}>X</span></h6>
                                        })}
                                    </td>
                                    <td>
                                        <Button variant="danger" onClick={() => deleteProduct(dat.id)}>Delete</Button>{"  "}
                                        <Button variant="primary" onClick={()=> updateProductModal(dat)}>Update</Button>
                                    </td>
                                
                                </tr>
                            )
                        })}
                    </tbody>
            </Table>
            <Button variant="success" onClick={openModal}>Add Product</Button>
            </div>
        </div>
        {/**************************** ADD PRODUCT MODAL ******************************** */}
        <AddProduct 
            data={data}
            show={show}
            closeModal={closeModal}
            handlerChange={handlerChange}
            insertProduct={insertProduct}
            setShowCategories={setShowCategories}
        />

        {/*********************** ADD PRODUCT CATEGORIES MODAL ************************** */}
        <AddProductCategories 
            cat={cat}
            showCategories={showCategories}
            handlerProductCat={handlerProductCat}
            setShowCategories={setShowCategories}
        />

        {/************************** UPDATE PRODUCT MODAL ******************************** */}
        <UpdateProduct 
            form={form}
            showUpdate={showUpdate}
            closeModalUpdate={closeModalUpdate}
            handlerChange={handlerChange}
            updateProduct={updateProduct}
            setShowCategories={setShowCategories}
        />

    </div>
    )
}
export default Product