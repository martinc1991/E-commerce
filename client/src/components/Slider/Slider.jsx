import React from 'react';

// Bootstrap // Bootstrap
import { Carousel, Navbar, Nav, Container, Col } from 'react-bootstrap';

export default function Slider() {
	return (
		<Carousel controls={false}>
			<Carousel.Item>
				<img className='w-100' src='https://picsum.photos/1200/400' alt='First slide' />
				<Carousel.Caption>
					<h3>First slide label</h3>
					<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img className='w-100' src='https://picsum.photos/1200/400' alt='Third slide' />

				<Carousel.Caption>
					<h3>Second slide label</h3>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img className='w-100' src='https://picsum.photos/1200/400' alt='Third slide' />

				<Carousel.Caption>
					<h3>Third slide label</h3>
					<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
				</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	);
}
