import login from './authentication/login';
import register from './authentication/register';
import forgotPassword from './authentication/forgotPassword';
import resetPassword from './authentication/resetPassword';

// import * as token from './token';
//
// const protectedRoute = async (req, res) => {
// 	try {
// 		let decoded = await token.decode(req);
// 		return res.json({
// 			success: true,
// 			decoded: decoded
// 		});
// 	} catch (err) {
// 		return res.json({
// 			success : false,
// 			error : err
// 		});
// 	}
// };

export {login, register, forgotPassword, resetPassword};
