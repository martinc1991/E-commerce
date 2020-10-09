import React from 'react';

// Bootstrap
import { Carousel } from 'react-bootstrap';

// CSS
import s from '../../styles/Slider.module.css';

export default function Slider(imagenes) {
	// Imagenes para probar el slider, desues deberiamos traerla desde otro lado
	var imagenes = [
		{
			url: 'https://picsum.photos/1200/400',
		},
	];

	return (
		<Carousel indicators={false} controls={true}>
			<Carousel.Item>
				<img className='w-100' src={imagenes[0].url} alt='First slide' />
				<Carousel.Caption>{/* Si queremos poner texto en cada slide */}</Carousel.Caption>
			</Carousel.Item>

			<Carousel.Item>
				<img className='w-100' src={imagenes[0].url} alt='Third slide' />
				<Carousel.Caption>{/* Si queremos poner texto en cada slide */}</Carousel.Caption>
			</Carousel.Item>

			<Carousel.Item>
				<img className='w-100' src={imagenes[0].url} alt='Third slide' />
				<Carousel.Caption>{/* Si queremos poner texto en cada slide */}</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	);
}
