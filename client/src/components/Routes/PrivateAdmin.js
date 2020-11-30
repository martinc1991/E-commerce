import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

const PrivateAdmin = ({component: Component, userLogin, ...rest}) =>{
    if(userLogin && userLogin.role === 'admin') {
        return <Route {...rest} component={Component}/>
    }else{
        return <Redirect to='/' />
    }
}

export default connect(state => ({
    userLogin: state.userLogged
}))(PrivateAdmin);