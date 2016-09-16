const isValidName = (name) => {
	return /^[A-Za-z ]+$/.test(name);
};

const isValidLogin = (login) => {
	return /^[A-Za-z]{8,12}$/.test(login);
};

const isValidEmail = (email) => {
	return /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(email);
};

const isValidPassword = (password) => {
	return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
};

export {isValidName, isValidLogin, isValidEmail, isValidPassword};
