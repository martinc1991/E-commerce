import React, {useState} from 'react'
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'react-bootstrap';
import data from './Data'
import s from '../styles/styles.module.css'
import Menu from './menu'


const Product = ()=> {
    const [date, setData] = useState(data)
    return (
        
        <div className={s.cont__Form__Admin__Pr}>
            <Menu/>
            <div className= {s.cont__table__pr}>
            <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {date.map(dat => {
                            return (
                                <tr>
                                    <td>{dat.name}</td>
                                    <td>{dat.price}</td>
                                    <td>{dat.stock}</td>
                                    <td>
                                        <Button variant="danger">Delete</Button>{"  "}
                                        <Button variant="primary">Update</Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
            </Table>
            <Button variant="success">Add Product</Button>
            </div>
        
        </div>
  
    )
}

export default Product