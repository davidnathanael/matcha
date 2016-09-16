import * as db from '../../db';
import * as utils from '../utils';

async function addToDatabase (req) {
	try {
		const infos = req.body;

		await db.get().collection('users').insertOne({
			'login': infos.login,
			'name': infos.name,
			'surname': infos.surname,
			'email': infos.email,
			'password': infos.password
		});
	} catch (e) {
		throw 'Unable to insert to database on registration';
	}
}

async function checkDuplicate (req) {
	let collection = await db.get().collection('users');
	let docs;
	const email = req.body.email;
	const login = req.body.login;

	try {
		docs = await collection.find({ $or: [{email: email}, {login: login}]}).toArray();
	} catch (e) {
		throw {
			status : 400,
			msg : 'Unable to check database',
		};
	}
	if (docs.length) {
		let duplicate = {
			email : false,
			login : false
		};
		if (docs[0].email == email || (docs[1] && docs[1].email == email))
			duplicate.email = true;
		if (docs[0].login == login || (docs[1] && docs[1].login == login))
			duplicate.login = true;
		throw {
			status : 409,
			msg : 'Email/login already used',
			duplicate : duplicate
		};
	}
}

function parse (req) {
	let error = {
		msg : 'Incorrect values',
		status : 406,
		incorrect : [],
		incorrect_fields : {
			name : false,
			surname : false,
			login : false,
			email : false,
			password : false,
			password_confirmation : false
		}
	};
	if (!req.body.name || !req.body.surname || !req.body.login || !req.body.email || !req.body.password || !req.body.password_confirmation) {
		throw {
			msg : 'Please fill all the fields.',
			status : 422,
			missing : {
				name : (!req.body.name) ? true : false,
				surname : (!req.body.surname) ? true : false,
				login : (!req.body.login) ? true : false,
				email : (!req.body.email) ? true : false,
				password : (!req.body.password) ? true : false,
				password_confirmation : (!req.body.password_confirmation) ? true : false
			}
		};
	}
	if (!utils.isValidName(req.body.name)) {
		error.incorrect_fields.name = true;
		error.incorrect.push('Invalid name, allowed characters : letters and spaces');
	}
	if (!utils.isValidName(req.body.surname)) {
		error.incorrect_fields.surname = true;
		error.incorrect.push('Invalid surname, allowed characters : letters and spaces');
	}
	if (!utils.isValidLogin(req.body.login)) {
		error.incorrect_fields.login = true;
		error.incorrect.push('Invalid login, allowed : lowercase letters between 8 and 12 characters');
	}
	if (!utils.isValidEmail(req.body.email)) {
		error.incorrect_fields.email = true;
		error.incorrect.push('Invalid email, please enter a valid email address');
	}
	if (!utils.isValidPassword(req.body.password)) {
		error.incorrect_fields.password = true;
		error.incorrect.push('Invalid password, must 8 characters long and contain 1 uppercase letter, 1 lowercase letter and 1 number');
	}
	if (req.body.password !== req.body.password_confirmation) {
		error.incorrect_fields.password_confirmation = true;
		error.incorrect.push('Passwords do not match');
	}
	if (error.incorrect.length)
		throw error;

}

const register = async (req, res) => {
	try {
		parse(req);
		await checkDuplicate(req);
		await addToDatabase(req);
		return res.send({success: true, msg: 'Successful registration'});
	} catch(err) {
		return res.send({success: false, error: err});
	}
};

export default register;
