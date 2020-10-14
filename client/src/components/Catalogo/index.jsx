import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react'
import ProductCard from '../ProductCard/index';
import Navegacion from '../Navegacion/Navegacion'
import Filter from '../Filter/index.jsx';
import {Container, Row, Col} from 'react-bootstrap';
import s from '../../styles/catalogo.module.css';
const url = 'localhost:3001';

var enlacesUser = [
	{ text: 'Catalogo', to: '/products/catalogo' },
	{ text: 'FAQs', to: '/' },
	{ text: 'Contacto', to: '/' },
	{ text: 'Ayuda', to: '/' },
	{ text: 'ADMIN', to: '/admin' },
];


const Catalogo = (props)=> {

    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);



    const onSelect = (select)=> {
		axios.get(`http://${url}/catalogo/`)
			 .then(res => {
				 let {data} = res.data
				 console.log(data)
				 return
                
			 })
    };

       
    const getCategory = () => {
        axios.get(`http://${url}/products/category`)
            .then(res => {
                if(res) return setCategories(res.data.result)
                else console.log("No hay Datos")
            })
            .catch(err => {
                console.log('Error')
            })
    };
    
    const handlerSelect= (e)=> {
        const catName = e.target.value;
        let obj = {
            [e.target.value]: e.target.checked
        };
        if(obj[e.target.value] === false){
            setData([]);
            getProduct();
        } else {
        console.log(obj)
        getCategory();
        console.log(catName);
        axios.get(`http://${url}/products/category/${catName}`)
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
        }
	};

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

    useEffect(()=> {
        getProduct();
        getCategory();
    }, [])

    console.log(props.products)
    const {products} = props
    return (
        

    <div>
        < Navegacion links={enlacesUser} showSearchbar={true} onSearch={props.onSearch}/>
        <h5><a href="/products/catalogo" className={s.title5}>Mostrar todos</a></h5>
        {products.length == 0  ? 
        data.length == 0 ? <h1 className={s.title2}>No hay registros en la base de datos</h1>
        :
        <Container>
            <h1 className={s.title1}>Registros encontrados: {data.length}</h1>
            < Filter categories={categories} handlerSelect={handlerSelect}/>
            <Row >

            {data.map((p)=> {
                return (
                    <Col lg="3">
                    <ProductCard 
                        id={p.id}
                        name={p.name}
                        description = {p.description}
                        img = {p.image}
                        price = {p.price}
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


export default Catalogo;