import * as db from '../../db';

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
