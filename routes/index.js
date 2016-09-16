import express from 'express';

let router = express.Router();

router.get('/test', (req, res) => {
	res.json({msg: 'Building api'});
});

export default router;
