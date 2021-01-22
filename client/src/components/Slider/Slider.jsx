import React from 'react';
// Bootstrap
import { Carousel } from 'react-bootstrap';

export default function Slider() {
	// Imagenes para probar el slider, despues deberiamos traerla desde otro lado
	var imagenes = [
		{
			url: require('../../multimedia/slider/img1.jpg'),
			alt: 'Texto de accesibilidad',
		},
		{
			url: require('../../multimedia/slider/img2.jpg'),
			alt: 'Texto de accesibilidad',
		},
		{
			url: require('../../multimedia/slider/img3.jpg'),
			alt: 'Texto de accesibilidad',
		},
		{
			url: require('../../multimedia/slider/img4.jpg'),
			alt: 'Texto de accesibilidad',
		},
	];

	return (
		<Carousel indicators={false} controls={false} style={{ zIndex: -1 }}>
			{imagenes.map((img) => {
				// console.log('url', img.url);
				return (
					<Carousel.Item>
						{/* <Image src={imagenes[0].url} fluid /> */}
						<img className='w-100' style={{ height: '100%' }} src={img.url} alt={img.alt} />
						<Carousel.Caption>{/* Si queremos poner texto en cada slide */}</Carousel.Caption>
					</Carousel.Item>
				);
			})}
		</Carousel>
	);
}
