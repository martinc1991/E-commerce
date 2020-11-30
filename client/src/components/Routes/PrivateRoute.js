import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import { isAuthenticated } from './autenticacion'

const PrivateRoute = ({component: Component, isAuthenticated, ...rest}) =>{
    if(isAuthenticated) {
        return <Route {...rest} component={Component}/>
    }else{
        return <Redirect to='/' />
    }
}

export default connect(state => ({
    isAuthenticated: isAuthenticated(state)
}))(PrivateRoute);