import crypto from 'crypto';

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

/* PASSWORD HASHING UTILS */

const genRandomString = (length) => {
	return crypto.randomBytes(Math.ceil(length / 2))
		.toString('hex')
		.slice(0, length);
};

const hashPassword = function (password, salt) {
	return crypto.createHmac('sha512', salt)
				.update(password)
				.digest('hex');
};

String.prototype.toTitleCase = function () {
	return this.replace(/\w\S*/g, (txt) => {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};


export {isValidName, isValidLogin, isValidEmail, isValidPassword, hashPassword, genRandomString};
