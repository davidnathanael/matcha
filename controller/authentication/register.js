import * as db from '../../db';

const addToDatabase = (req) => {
	return new Promise((res, rej) => {
		const infos = req.body;

		db.get().collection('users').insertOne({
			'login': infos.login,
			'name': infos.name,
			'surname': infos.surname,
			'email': infos.email,
			'password': infos.password
		}, (err) => {
			if (err) {
				rej('Unable to insert to database on registration');
			}
			else {
				res();
			}
		});
	});
};

const checkDuplicate = (req) => {
	return new Promise( async (res, rej) => {
		let collection = await db.get().collection('users');
		const email = req.body.email;
		const login = req.body.login;

		collection.find({ $or: [{email: email}, {login: login}]}).toArray( (err, docs) => {
			if (err) {
				rej('Unable to check database.');
			}
			else {
				if (docs.length) {
					let duplicate = '';
					if (docs[0].email == email || (docs[1] && docs[1].email == email))
						duplicate = 'Email';
					if (docs[0].login == login || (docs[1] && docs[1].login == login))
						duplicate = (duplicate) ? 'Email and login ' : 'Login';
					rej(duplicate + ' already used');
				}
				else {
					res();
				}
			}
		});
	});
};

const register = async (req, res) => {
	try {
		await checkDuplicate(req);
		await addToDatabase(req);
		return res.send({success: true, msg: 'Successful registration'});
	} catch(err) {
		return res.send({success: false, error: err});
	}
};

export default register;
