import React, { Component, useState } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import s from '../../styles/filter.module.css';

export default function Filter(props){
   return (
        <div className={`${s.filtro}`}>
            <Form onChange={props.handlerSelect}>
            {props.categories.map(x => {
                return (
                <Form.Check
                type="switch"
                id={x.name}
                label={x.name}
                value={x.name}
                />
                )
            })}
            </Form>
        </div>
    )
}

