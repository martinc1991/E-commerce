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
			url: 'oferta_slide_1.png',
		},
		{
			url: 'oferta_slide_2.png',
		},
		{
			url: '../../multimedia/slider/oferta_slide_3.png',
		},
	];

	return (
		<Carousel indicators={true} controls={true} style={{ zIndex: -1 }}>
			<Carousel.Item style={{ height: '500px' }}>
				{/* <Image src={imagenes[0].url} fluid /> */}
				<img className='w-100' style={{ height: '100%' }} src={require('../../multimedia/slider/oferta_slide_1.png')} alt='First slide' />
				<Carousel.Caption>{/* Si queremos poner texto en cada slide */}</Carousel.Caption>
			</Carousel.Item>

			<Carousel.Item style={{ height: '500px' }}>
				{/* <Image className='w-100'style={{'height':"100%"}} src={imagenes[0].url} fluid /> */}
				<img className='w-100' style={{ height: '100%' }} src={require('../../multimedia/slider/oferta_slide_2.jpg')} alt='Third slide' />
				<Carousel.Caption>{/* Si queremos poner texto en cada slide */}</Carousel.Caption>
			</Carousel.Item>

			<Carousel.Item style={{ height: '500px' }}>
				{/* <Image className='w-100'style={{'height':"100%"}} src={imagenes[0].url} fluid /> */}
				<img className='w-100' style={{ height: '100%' }} src={require('../../multimedia/slider/oferta_slide_3.jpg')} alt='Third slide' />
				<Carousel.Caption>{/* Si queremos poner texto en cada slide */}</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	);
}
