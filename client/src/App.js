import React from 'react';
import logo from './logo.svg';
import './App.css';
import PrinciapalAdmin from './components/AdminForm/pageP'
import Product from './components/AdminForm/product'
import Category from './components/AdminForm/Categorys'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Switch, Link} from 'react-router-dom'


function App() {
  return (
    <div>
    {/* <PrinciapalAdmin/> */}
    
    <Switch>
      <Route path='/admin' exact={true} component={PrinciapalAdmin}/>
      <Route path='/admin/product' exact={true} component={Product}/>
      <Route path='/admin/category' exact={true} component={Category}/>
      <Route path='/' exact={true} >
            <Link to="/admin">Admin</Link>
      </Route>

    </Switch>
    </div>
  );
}

export default App;
