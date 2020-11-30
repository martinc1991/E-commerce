import React from 'react'
import { Nav, Navbar, Form, Button, FormControl, Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import s from '../styles/styles.module.css';
import {enlacesUser, enlacesUserConAdmin, enlacesUserSinAdmin, enlacesAdmin } from '../../constans/constans';
import Navegacion from '../Navegacion/Navegacion'

const WelcomeAdmin = ()=> {
    return (
        <div>
            <Navegacion linksU={enlacesUserSinAdmin} linksA={enlacesAdmin} showSearchbar={false} />
            <Jumbotron>
                    <h1>Hello, Wellcome ADMIN!</h1>
                    <p>
                        We're working to give you the best! comming soon!
                    </p>
                    <p>
                        <Button variant="primary">Learn more</Button>
                    </p>
            </Jumbotron>

        </div>
    )
}


export default WelcomeAdmin