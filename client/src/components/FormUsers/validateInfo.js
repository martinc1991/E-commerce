export default function validateInfo(values) {
	var errors = {};
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	//name
	if (!values.userName.trim()) {
		errors.userName = 'Nombre de Usuario requerido';
	} else if (/[^a-zA-Z -]/.test(values.userName)) {
		errors.userName = 'El nombre solo debe contener letras';
	}

	// //userMail
	// if(!values.userMail) {
	//   errors.userMail = "Email requerido"
	// }else if ( re.test(String(values.userMail).toLowerCase())){
	//     errors.userMail = "Email ingresado es invalido"
	//
	// }

	if (!values.userPassword.trim()) {
		errors.userPassword = 'Contraseña es requerida';
	} else if (values.userPassword.length < 8) {
		errors.userPassword = 'Contraseña debe tener 8 o mas caracteres';
	}

	if (!values.userPasswordConfirm.trim()) {
		errors.userPasswordConfirm = 'Contraseña es requerida';
	} else if (values.userPasswordConfirm !== values.userPassword) {
		errors.userPasswordConfirm = 'Las contraseña no son iguales';
	}

	return errors;
}
