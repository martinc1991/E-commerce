import React from 'react';
import './App.css';

// Componentes
import Navegacion from './components/Navegacion/Navegacion';
import Slider from './components/Slider/Slider';
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	return (
		<div className='App'>
			<Navegacion></Navegacion>
			<Slider></Slider>
		</div>
	);
}

export default App;
