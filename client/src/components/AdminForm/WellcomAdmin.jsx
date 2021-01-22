import React from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import { enlacesAdmin, enlacesUserSinAdmin } from '../../constants/constants';
import Navegacion from '../Navegacion/Navegacion';

const WelcomeAdmin = () => {
	return (
		<div>
			<Navegacion linksU={enlacesUserSinAdmin} linksA={enlacesAdmin} showSearchbar={false} />
			<Jumbotron>
				<h1>Hello, Wellcome ADMIN!</h1>
				<p>We're working to give you the best! comming soon!</p>
				<p>
					<Button variant='primary'>Learn more</Button>
				</p>
			</Jumbotron>
		</div>
	);
};

export default WelcomeAdmin;
