import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react'
import ProductCard from '../ProductCard/index';
import Navegacion from '../Navegacion/Navegacion'
import {Container, Row, Col} from 'react-bootstrap';
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
    }, [])

    console.log(props.products)
    const {products} = props
    return (
        

    <div>
        < Navegacion links={enlacesUser} showSearchbar={true} onSearch={props.onSearch}/>
        <h5><a href="/products/catalogo">Mostrar todos</a></h5>
        {products.length == 0  ? 
        data.length == 0 ? <h1>No hay registros en la base de datos</h1>
        :
        <Container>
            <h1>Registros encontrados: {data.length}</h1>
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
        <h1>Registros encontrados: {products.length}</h1>
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