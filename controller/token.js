import * as jwt from 'jsonwebtoken';
import settings from '../settings';

async function decode(req) {
	let token = req.body.token || req.query.token || req.headers['x-access-token'];

	try {
		if (token) {
			if (!settings.apiSecret)
				throw {message: 'API secret key not set'};
			let decoded = await jwt.verify(token, settings.apiSecret);
			return decoded;
		} else {
			throw {
				message: 'No token provided.'
			};
		}
	} catch (err) {
		throw err;
	}
}

function issue(id)
{
	try {
		let claims = {
			sub: id,
			iss: 'http://localhost:3000',
			persmission: 'basic'
		};
		return jwt.sign(claims, settings.apiSecret, {});
	} catch (err) {
		throw err;
	}

}

export {decode, issue};
