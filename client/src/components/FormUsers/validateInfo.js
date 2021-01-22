export default function validateInfo(values) {
	var errors = {};

	//name
	if (!values.userName.trim()) {
		errors.userName = 'Nombre de Usuario requerido';
	} else if (/[^a-zA-Z -]/.test(values.userName)) {
		errors.userName = 'El nombre solo debe contener letras';
	}

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
