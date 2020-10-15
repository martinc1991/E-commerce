import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react'
import ProductCard from '../ProductCard/index';
import Navegacion from '../Navegacion/Navegacion'
import Filter from '../Filter/index';
import { connect } from 'react-redux';
import {
    getCategories,
    getProducts,
    getProductByCategory
}from '../../store/actions/actions'

import {Container, Row, Col, Form} from 'react-bootstrap';
import s from '../../styles/catalogo.module.css';
const url = 'localhost:3001';

var enlacesUser = [
	{ text: 'Catalogo', to: '/products/catalogo' },
	{ text: 'FAQs', to: '/' },
	{ text: 'Contacto', to: '/' },
	{ text: 'Ayuda', to: '/' },
	{ text: 'ADMIN', to: '/admin' },
];


const Catalogo = ({products, productsP, categories, getCategoryP, getProductP, onSearch, getProductByCategoryP})=> {

    console.log(products)
    const handlerSelect= (e)=> {
        const catName = e.target.value;
        let obj = {
            [e.target.value]: e.target.checked
        };
        if(obj[e.target.value] === false){
            getProductP();
        } else {
        console.log(obj)
        getCategoryP();
        console.log(catName);
        getProductByCategoryP(catName)
        }
	};

    useEffect(()=> {
        getProductP();
        getCategoryP();
    }, [])


    return (

    <div>
        < Navegacion links={enlacesUser} showSearchbar={true} onSearch={onSearch}/>
        <h5><a href="/products/catalogo" className={s.title5}>Mostrar todos</a></h5>
        {products.length == 0  ? 
        productsP.length == 0 ? <h1 className={s.title2}>No hay registros en la base de datos</h1>
        :
        <Container>
            <h1 className={s.title1}>Registros encontrados: {productsP.length}</h1>
            < Filter categories={categories} handlerSelect={handlerSelect}/>
            <Row >
            {productsP.map((p)=> {
                return (
                    <Col lg="3">
                    <ProductCard 
                        id={p.id}
                        name={p.name}
                        description = {p.description}
                        img = {p.image}
                        price = {p.price}
                        stock={p.stock}
                    />
                    </Col>
                )
            })}
            </Row>
        </Container>
        :
        <Container>
        <h1 className={s.title1}>Registros encontrados: {products.length}</h1>
        < Filter categories={categories} handlerSelect={handlerSelect}/>
        <Row>
        {products.map((p)=> {
            return (
                <Col lg="3">
                <ProductCard 
                    id={p.id}
                    name={p.name}
                    description = {p.description}
                    img = {p.image}
                    price = {p.price}
                    stock={p.stock}
                />
                </Col>
            )
        })}
        </Row>
        </Container>
    }
        
    </div>
    )
}

function mapStateToProps(state){
    return {
        categories: state.categories,
        productsP: state.products
    }
}
function mapDispatchToProps(dispatch){
    return {
        getCategoryP: () =>  dispatch(getCategories()),
        getProductP : () => dispatch(getProducts()),
        getProductByCategoryP : (catN) =>  dispatch(getProductByCategory(catN))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalogo);


