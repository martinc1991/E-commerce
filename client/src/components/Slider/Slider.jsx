import React from 'react';

// Bootstrap
import { Carousel, Image } from 'react-bootstrap';

// CSS
import s from '../../styles/Slider.module.css';

export default function Slider(imagenes) {
	// Imagenes para probar el slider, desues deberiamos traerla desde otro lado
	// if(!imagenes){

	// }
	var imagenes = [
		{
			url: 'https://images.unsplash.com/photo-1578922176731-e554b158341e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
		},
		{
			url: 'https://picsum.photos/800/400'
		},
		{
			url: 'https://images.unsplash.com/photo-1594856413190-ba33b42ec51e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
		}	
	];

	return (
		<Carousel indicators={true} controls={true}>
			<Carousel.Item style={{'height':"500px"}}>
				{/* <Image src={imagenes[0].url} fluid /> */}
				<img className='w-100'style={{'height':"100%"}}src={imagenes[0].url} alt='First slide' />
				<Carousel.Caption>{/* Si queremos poner texto en cada slide */}</Carousel.Caption>
			</Carousel.Item>

			<Carousel.Item style={{'height':"500px"}}>
			{/* <Image className='w-100'style={{'height':"100%"}} src={imagenes[0].url} fluid /> */}
				<img className='w-100'style={{'height':"100%"}} src={imagenes[1].url} alt='Third slide' />
				<Carousel.Caption>{/* Si queremos poner texto en cada slide */}</Carousel.Caption>
			</Carousel.Item>

			<Carousel.Item style={{'height':"500px"}}>
			{/* <Image className='w-100'style={{'height':"100%"}} src={imagenes[0].url} fluid /> */}
				<img className='w-100'style={{'height':"100%"}} src={imagenes[2].url} alt='Third slide' />
				<Carousel.Caption>{/* Si queremos poner texto en cada slide */}</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	);
}
