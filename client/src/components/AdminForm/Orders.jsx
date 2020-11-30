import React from 'react';
import {Table, Button, Row, Col, Container, Form} from 'react-bootstrap';
import AddCategory from '../Modals/AddCategory';
import UpdateCategory from '../Modals/UpdateCategory';
import axios from 'axios';
import {useState, useEffect} from 'react';
import s from '../../styles/adminOrders.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashAlt, faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import {
    filterOrders,
    getOrders,
    deleteOrder
    // AddCategorie,
    // updCategory,
    // deleteCategory
} from '../../store/actions/order_actions';
import {enlacesUser, enlacesUserConAdmin, enlacesUserSinAdmin, enlacesAdmin } from '../../constans/constans'
import Navegacion from '../Navegacion/Navegacion'

const url = 'localhost:3001';

const Orders = ({ ordersP, getOrdersP, filterOrdersP, deleteOrderP }) => {
    console.log('OBJETO ORDENES')
    console.log(ordersP)
    //console.log(props)
    /*********************** Local States ************************* */
    const [orderType, setOrderType] = useState('all');
    

    /*********************** Functions **************************** */
    const handlerChange = (e) => {
        setOrderType(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        filterOrdersP(orderType)
        // setOrderType('')
    }

    const handleDelete = (id) => {
        console.log('id de la orden ', id)
        deleteOrderP(id);
        filterOrdersP(orderType);
    }
    // console.log(orderType)


    // const updateCategoryModal = (category)=> {
    //     let list = allOrders;
    //     list.map((dat, index)=>{
    //         if(dat.id === category.id) {
    //             list[index].name = category.name;
    //             list[index].description = category.description;
    //         }
    //     })
    //     setShowUpdate(true);
    //     setForm(category);
    //     setData(list);
    // }

    // const updateCategory = (dat)=>{
    //     console.log(dat)
    //         updCategoryP(dat);
    //         setShowUpdate(false);
    //     return;
    // }

    /*********************** Component Life Cycle *************************** */
    useEffect(()=> {
        getOrdersP();
    }, [])

    /****************************** Render ********************************** */
    return (
        <div>   
            <Navegacion linksU={enlacesUserSinAdmin} linksA={enlacesAdmin} showSearchbar={false} />
            <Container>
            <Row className={s.orderHeader}>
                <Col sm={12} md={8} className={s.orderTitle}><h3>Listado de Ordenes</h3></Col>
                <Col sm={12} md={4} className={s.orderFilter}>
                    <div className={s.orderFilterCont}>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Control as="select" custom onChange={handlerChange}>
                                    <option value={'all'}>Todas</option>
                                    <option value={'cart'}>Carrito</option>
                                    <option value={'created'}>Creada</option>
                                    <option value={'in_process'}>En proceso</option>
                                    <option value={'fullfilled'}>Completada</option>
                                    <option value={'rejected'}>Rechazada</option>
                                </Form.Control> 
                                <Button variant="primary" type="submit">
                                    filter
                                </Button>
                            </Form.Group>
                        </Form>
                    </div>
                </Col>
            </Row>
            <hr/>
            </Container>
            <div className={s.table_prin}>
                {/* <Menu/> */}
                <div>
                <Table striped bordered hover size="sm" responsive="lg">
                        <thead className={s.tableTitle}>
                            <tr>
                            <th>Reference</th>
                            <th>User</th>
                            <th>Date Created</th>
                            <th>Status</th>
                            <th className={s.tableActions}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordersP.map(order => {
                                return (
                                    <tr className={s.tableDescrip}>
                                        <td>{order.id}</td>
                                        <td>{order.user.email}</td>
                                        <td>{order.createdAt}</td>
                                        <td>{order.status}</td>
                                        <td className={s.icons}>
                                            <FontAwesomeIcon icon={faTrashAlt} size={'1x'} className={s.iconDelete} onClick={() => handleDelete(order.id)} />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                </Table>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return {
        ordersP: state.orders,
        filteredOrdersP: state.filteredOrders
    }
}

function mapDispatchToProps(dispatch){
    return {
        getOrdersP: () =>  dispatch(getOrders()),
        filterOrdersP: (status) => dispatch(filterOrders(status)),
        deleteOrderP: (id) => dispatch(deleteOrder(id))
        // addCategoryP: (data) => dispatch(AddCategorie(data)),
        // updCategoryP: (data) => dispatch(updCategory(data)),
        // deleteCategoryP : (id) => dispatch(deleteCategory(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Orders);