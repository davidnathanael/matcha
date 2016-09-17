import * as jwt from 'jsonwebtoken';
import * as db from '../../db';
import * as utils from '../utils';
import * as token from '../token';

async function getUser(req) {
	let collection = await db.get().collection('users');
	let docs;

	try {
		docs = await collection.find({login: req.body.login}).toArray();
	} catch (e) {
		throw {
			status : 400,
			msg : 'Unable to check database',
		};
	}
	if (docs.length) {
		return docs[0];
	} else {
		throw {
			status : 401,
			msg : 'Incorrect login/password',
		};
	}
}

async function checkPassword(req) {
	try {
		let user = await getUser(req);
		if (utils.hashPassword(req.body.password, user.passwordSalt) !== user.password) {
			throw {
				status : 401,
				msg : 'Incorrect login/password',
			};
		}
		return user;
	} catch(err) {
		throw err;
	}
}

const login = async (req, res) => {
	try {
		let user = await checkPassword(req);
		console.log(token);
		let issued = token.issue(user._id);
		return res.json({
			success : true,
			token: issued,
			msg : 'Successful login',
		});
	} catch (err) {
		return res.json({
			success : false,
			error : err
		});
	}
};

export default login;
