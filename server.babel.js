import express from 'express';
import * as db from './db';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import logger from 'morgan';

import index_routes from './routes/index';
import api_routes from './routes/api';

const app = express();

/*global __dirname process:true*/

db.connect('mongodb://localhost:27017/matcha', (err) => {
	if (err) {
		console.log('Unable to connect to Mongo.');
		process.exit(1);
	} else {
		app.listen(process.env.PORT || 3000);
	}
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index_routes);
app.use('/api', api_routes);

app.use('/', (req, res) => {
	res.json({error: '404'});
	let err = new Error('Not Found');
	err.status = 404;
});

// error handlers
//
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use( (err, req, res) => {
		res.status(err.status || 500);
		res.json({
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use( (err, req, res) => {
	res.status(err.status || 500);
	res.json({
		message: err.message,
		error: err
	});
});
