import React from 'react';
import {Button, Modal, Form } from 'react-bootstrap';

const AddProductCategories = ({categories, showCategories, handlerProductCat, setShowCategories}) => {

    
    return (
        <Modal show={showCategories} onHide={()=> setShowCategories(false)} centered={true} backdrop='static'>
            
            <Modal.Header><Modal.Title>Choose at least one category</Modal.Title></Modal.Header>
            <Modal.Body>
                <Form.Group onChange={handlerProductCat} >
                        {categories.map(c => {
                            return (
                                    <div>
                                        <label htmlFor={c.name}>{c.name}</label>
                                        <input type="checkbox" name={c.name} value={c.name} onChange={handlerProductCat} />
                                    </div>
                            )
                        })}
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={() => setShowCategories(false)}>done!</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default AddProductCategories; 